import type { Metadata } from 'next';
import { Kantumruy_Pro } from 'next/font/google';
import './globals.css';

const kantumruyPro = Kantumruy_Pro({
  subsets: ['khmer', 'latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-kantumruy',
});

export const metadata: Metadata = {
  title: 'MIS CPP - ប្រព័ន្ធគ្រប់គ្រងវត្តមាន និងប្រាក់ខែ',
  description: 'Multi-tenant employee attendance and HR/payroll system with AI face match, GPS, QR, and NFC.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="km">
      <body className={`${kantumruyPro.variable} font-sans antialiased text-slate-900 bg-slate-50`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
