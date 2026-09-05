'use client';

import { useState, useEffect } from 'react';
import { MapPin, ScanFace, QrCode, CreditCard, CheckCircle2, AlertCircle, Loader2, UserCheck } from 'lucide-react';
import Webcam from 'react-webcam';
import { supabase } from '@/lib/supabase';

type CheckInMethod = 'gps' | 'face' | 'qr' | 'nfc';

export function CheckInPanel() {
  const [activeMethod, setActiveMethod] = useState<CheckInMethod | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  // GPS State
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);

  const handleCheckIn = async (method: string, data?: any) => {
    setStatus('loading');
    setMessage('កំពុងផ្ទៀងផ្ទាត់...');
    
    try {
      // Mock API call to Supabase
      // In a real scenario, we would insert into attendance_logs table
      /*
      const { error } = await supabase.from('attendance_logs').insert({
        user_id: 'mock-user-id', // From auth
        institution_id: 'mock-inst-id',
        check_in_time: new Date().toISOString(),
        check_in_method: method,
        status: 'present',
      });
      */
      
      setTimeout(() => {
        setStatus('success');
        setMessage('កត់ត្រាចូលដោយជោគជ័យ! (Checked In)');
        setTimeout(() => {
          setStatus('idle');
          setActiveMethod(null);
        }, 3000);
      }, 1500);

    } catch (error) {
      setStatus('error');
      setMessage('មានបញ្ហាក្នុងការកត់ត្រា។ (Error)');
    }
  };

  const startGPS = () => {
    setActiveMethod('gps');
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
          handleCheckIn('gps', { lat: position.coords.latitude, lng: position.coords.longitude });
        },
        (error) => {
          setStatus('error');
          setMessage('មិនអាចទាញយកទីតាំងបានទេ។ សូមបើកសិទ្ធិទីតាំង។ (Location denied)');
        }
      );
    } else {
      setStatus('error');
      setMessage('កម្មវិធីរុករករបស់អ្នកមិនគាំទ្រ GPS ទេ។ (GPS not supported)');
    }
  };

  const startFaceMatch = () => {
    setActiveMethod('face');
    setStatus('idle');
    // We render the webcam, user will click "Scan"
  };

  const startQR = () => {
    setActiveMethod('qr');
    setStatus('idle');
    // Mock QR Scanner
  };

  const startNFC = async () => {
    setActiveMethod('nfc');
    setStatus('loading');
    setMessage('សូមដាក់កាត NFC ក្បែរឧបករណ៍របស់អ្នក...');
    
    try {
      if ('NDEFReader' in window) {
        // @ts-ignore
        const ndef = new window.NDEFReader();
        await ndef.scan();
        ndef.onreading = (event: any) => {
          const serialNumber = event.serialNumber;
          handleCheckIn('nfc', { serialNumber });
        };
      } else {
        // Fallback for unsupported browsers
        setTimeout(() => {
          handleCheckIn('nfc', { mockId: '1234-nfc-mock' });
        }, 2000);
      }
    } catch (error) {
      setStatus('error');
      setMessage('NFC មិនត្រូវបានគាំទ្រ ឬបរាជ័យ។ (NFC failed)');
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Methods Sidebar */}
      <div className="w-full md:w-1/3 flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">ជ្រើសរើសវិធីសាស្ត្រ</h2>
        
        <button 
          onClick={startGPS}
          className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${activeMethod === 'gps' ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 shadow-sm' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-200 dark:hover:border-indigo-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
        >
          <div className={`p-3 rounded-xl ${activeMethod === 'gps' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h3 className={`font-semibold ${activeMethod === 'gps' ? 'text-indigo-900 dark:text-indigo-200' : 'text-slate-900 dark:text-slate-200'}`}>ទីតាំង (GPS)</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">ពិនិត្យជាមួយ Geofence</p>
          </div>
        </button>

        <button 
          onClick={startFaceMatch}
          className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${activeMethod === 'face' ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 shadow-sm' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-200 dark:hover:border-indigo-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
        >
          <div className={`p-3 rounded-xl ${activeMethod === 'face' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
            <ScanFace className="w-6 h-6" />
          </div>
          <div>
            <h3 className={`font-semibold ${activeMethod === 'face' ? 'text-indigo-900 dark:text-indigo-200' : 'text-slate-900 dark:text-slate-200'}`}>ស្កេនមុខ (AI)</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">ផ្ទៀងផ្ទាត់ដោយប្រើ AI</p>
          </div>
        </button>

        <button 
          onClick={startQR}
          className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${activeMethod === 'qr' ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 shadow-sm' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-200 dark:hover:border-indigo-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
        >
          <div className={`p-3 rounded-xl ${activeMethod === 'qr' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
            <QrCode className="w-6 h-6" />
          </div>
          <div>
            <h3 className={`font-semibold ${activeMethod === 'qr' ? 'text-indigo-900 dark:text-indigo-200' : 'text-slate-900 dark:text-slate-200'}`}>ស្កេន QR</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">ប្រើកូដ QR ផ្ទាល់ខ្លួន</p>
          </div>
        </button>

        <button 
          onClick={startNFC}
          className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${activeMethod === 'nfc' ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 shadow-sm' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-200 dark:hover:border-indigo-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
        >
          <div className={`p-3 rounded-xl ${activeMethod === 'nfc' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h3 className={`font-semibold ${activeMethod === 'nfc' ? 'text-indigo-900 dark:text-indigo-200' : 'text-slate-900 dark:text-slate-200'}`}>ស្កេនកាត NFC</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">ដាក់កាតក្បែរទូរស័ព្ទ</p>
          </div>
        </button>
      </div>

      {/* Action Area */}
      <div className="w-full md:w-2/3 flex flex-col bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 items-center justify-center min-h-[400px]">
        {!activeMethod && (
          <div className="text-center text-slate-400 dark:text-slate-500">
            <UserCheck className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">សូមជ្រើសរើសវិធីសាស្ត្រកត់ត្រា</p>
          </div>
        )}

        {status === 'loading' && (
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-indigo-600 dark:text-indigo-400 animate-spin mx-auto mb-4" />
            <p className="text-lg font-medium text-slate-700 dark:text-slate-300">{message}</p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <p className="text-xl font-bold text-slate-800 dark:text-slate-200">{message}</p>
            <p className="text-slate-500 dark:text-slate-400 mt-2">{new Date().toLocaleTimeString('km-KH')}</p>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-10 h-10" />
            </div>
            <p className="text-lg font-bold text-slate-800 dark:text-slate-200">{message}</p>
            <button 
              onClick={() => { setStatus('idle'); setActiveMethod(null); }}
              className="mt-6 px-6 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-full font-medium transition-colors"
            >
              សាកល្បងម្ដងទៀត
            </button>
          </div>
        )}

        {/* Specific UI for idle state of selected methods */}
        {status === 'idle' && activeMethod === 'face' && (
          <div className="w-full max-w-sm flex flex-col items-center">
            <div className="relative rounded-2xl overflow-hidden border-4 border-indigo-100 dark:border-indigo-900 w-full aspect-square bg-black">
              <Webcam 
                audio={false}
                screenshotFormat="image/jpeg"
                className="w-full h-full object-cover"
              />
              {/* Overlay guides */}
              <div className="absolute inset-0 border-2 border-indigo-400 dark:border-indigo-500 border-dashed rounded-full m-8 opacity-70"></div>
            </div>
            <button 
              onClick={() => handleCheckIn('face')}
              className="mt-6 w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold text-lg shadow-lg shadow-indigo-200 dark:shadow-none transition-all active:scale-95"
            >
              ស្កេនឥឡូវនេះ
            </button>
          </div>
        )}

        {status === 'idle' && activeMethod === 'qr' && (
          <div className="w-full max-w-sm flex flex-col items-center text-center">
            <div className="w-64 h-64 border-4 border-indigo-600 border-dashed rounded-3xl flex items-center justify-center mb-6 relative overflow-hidden bg-white dark:bg-slate-900 shadow-inner">
               <div className="absolute top-0 left-0 w-full h-2 bg-indigo-500 animate-[bounce_2s_infinite] opacity-50 shadow-[0_0_10px_#4f46e5]"></div>
               <QrCode className="w-24 h-24 text-slate-200 dark:text-slate-700" />
            </div>
            <p className="text-slate-600 dark:text-slate-400 font-medium mb-6">ដាក់កូដ QR របស់អ្នកក្នុងប្រអប់នេះ</p>
            <button 
              onClick={() => handleCheckIn('qr')}
              className="w-full py-3 bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white rounded-full font-medium transition-all"
            >
              [Mock] បាញ់ QR ដោយជោគជ័យ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
