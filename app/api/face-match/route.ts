import { NextRequest, NextResponse } from 'next/server';

// In a real app, this would use pgvector or Drizzle with Euclidean distance function.
// For this environment, since we fallback to localStorage for enrollments on the client,
// we will accept the array of enrolled descriptors from the client for demonstration,
// or simulate the database fetch. Let's do the math on the server.

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { descriptor, enrollments } = body;

    if (!descriptor || !Array.isArray(descriptor)) {
      return NextResponse.json({ error: 'Invalid descriptor provided' }, { status: 400 });
    }

    if (!enrollments || enrollments.length === 0) {
      return NextResponse.json({ error: 'No enrolled users found in database' }, { status: 404 });
    }

    const THRESHOLD = 0.5;
    let bestMatch = null;
    let minDistance = Infinity;

    // Server-side matching algorithm (Euclidean Distance)
    for (const enrollment of enrollments) {
      const enrolledDescriptor = enrollment.descriptor;
      if (!enrolledDescriptor || enrolledDescriptor.length !== descriptor.length) continue;

      let distance = 0;
      for (let i = 0; i < descriptor.length; i++) {
        distance += Math.pow(descriptor[i] - enrolledDescriptor[i], 2);
      }
      distance = Math.sqrt(distance);

      if (distance < minDistance) {
        minDistance = distance;
        bestMatch = enrollment;
      }
    }

    if (bestMatch && minDistance <= THRESHOLD) {
      return NextResponse.json({
        success: true,
        match: {
          employeeId: bestMatch.employeeId,
          employeeName: bestMatch.employeeName,
          distance: minDistance
        }
      });
    }

    return NextResponse.json({
      success: false,
      message: 'Face not recognized or distance too high',
      distance: minDistance
    });

  } catch (error) {
    console.error('Face match error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
