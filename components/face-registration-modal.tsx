'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from '@vladmandic/face-api';
import { Loader2, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase'; // We'll create this mock/real client

interface FaceRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  employeeId?: string;
  employeeName?: string;
}

export function FaceRegistrationModal({ isOpen, onClose, employeeId = 'E001', employeeName = 'សុខ សាន់' }: FaceRegistrationModalProps) {
  const [status, setStatus] = useState<'loading_models' | 'idle' | 'detecting' | 'success' | 'error'>('loading_models');
  const [message, setMessage] = useState('កំពុងផ្ទុក AI Models...');
  const webcamRef = useRef<Webcam>(null);

  const loadModels = async () => {
    try {
      setStatus('loading_models');
      setMessage('កំពុងផ្ទុក AI Models...');
      
      // Load from public/models
      await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      ]);
      
      setStatus('idle');
      setMessage('សូមដាក់ផ្ទៃមុខរបស់អ្នកចំកណ្តាលកាមេរ៉ា');
    } catch (err) {
      console.error('Error loading face-api models:', err);
      setStatus('error');
      setMessage('មិនអាចផ្ទុក AI Models បានទេ។ សូមពិនិត្យមើលបណ្តាញ។');
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadModels();
    }
  }, [isOpen]);

  const captureAndRegister = useCallback(async () => {
    if (!webcamRef.current) return;
    
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    setStatus('detecting');
    setMessage('កំពុងវិភាគផ្ទៃមុខ...');

    try {
      // Create an image element from the screenshot
      const img = new Image();
      img.src = imageSrc;
      await new Promise((resolve) => { img.onload = resolve; });

      // Detect face and compute descriptor
      const detection = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();

      if (!detection) {
        setStatus('error');
        setMessage('រកមិនឃើញផ្ទៃមុខទេ។ សូមព្យាយាមម្តងទៀត។');
        return;
      }

      // Convert Float32Array to standard array for JSON storage
      const descriptorArray = Array.from(detection.descriptor);

      // Save to localStorage (fallback/offline)
      const existingEnrollments = JSON.parse(localStorage.getItem('face_enrollments') || '[]');
      existingEnrollments.push({
        id: crypto.randomUUID(),
        employeeId,
        employeeName,
        descriptor: descriptorArray,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('face_enrollments', JSON.stringify(existingEnrollments));

      // Attempt to save to Supabase (assuming supabase client is set up, it fails gracefully if not connected)
      try {
        await supabase.from('face_enrollments').insert({
          employee_id: employeeId,
          employee_name: employeeName,
          face_embedding: descriptorArray
        });
      } catch (err) {
        console.log('Supabase sync skipped/failed. Local storage saved.', err);
      }

      setStatus('success');
      setMessage('ចុះឈ្មោះផ្ទៃមុខបានជោគជ័យ!');
      
      setTimeout(() => {
        onClose();
        setStatus('idle');
      }, 2000);

    } catch (error) {
      console.error(error);
      setStatus('error');
      setMessage('មានបញ្ហាក្នុងការវិភាគ។ សូមព្យាយាមម្តងទៀត។');
    }
  }, [employeeId, employeeName, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">ចុះឈ្មោះផ្ទៃមុខ</h2>
          <button onClick={onClose} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 flex flex-col items-center flex-1">
          <p className="text-slate-600 dark:text-slate-400 mb-6 text-center">{message}</p>
          
          <div className="relative w-full aspect-square max-w-[280px] bg-slate-900 rounded-2xl overflow-hidden shadow-inner mb-6">
            {(status === 'idle' || status === 'detecting' || status === 'error') ? (
              <>
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{ facingMode: "user" }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 border-2 border-dashed border-indigo-400 m-8 rounded-full opacity-50 pointer-events-none" />
              </>
            ) : status === 'loading_models' ? (
              <div className="w-full h-full flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
              </div>
            ) : status === 'success' ? (
              <div className="w-full h-full flex flex-col items-center justify-center bg-green-50 dark:bg-green-900/20">
                <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                <p className="text-green-700 dark:text-green-400 font-bold">ជោគជ័យ</p>
              </div>
            ) : null}
            
            {status === 'detecting' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <Loader2 className="w-12 h-12 text-white animate-spin" />
              </div>
            )}
          </div>
          
          <button
            disabled={status !== 'idle' && status !== 'error'}
            onClick={captureAndRegister}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
              (status === 'idle' || status === 'error')
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 dark:shadow-none'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
            }`}
          >
            {status === 'error' ? 'ព្យាយាមម្តងទៀត' : 'ថតរូបចុះឈ្មោះ'}
          </button>
        </div>
      </div>
    </div>
  );
}
