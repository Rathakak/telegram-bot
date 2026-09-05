'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { 
  LayoutDashboard, 
  UserCheck, 
  CircleDollarSign,
  Moon,
  Sun
} from 'lucide-react';
const CheckInPanel = dynamic(() => import('@/components/check-in-panel').then(m => m.CheckInPanel), { ssr: false });
import { DashboardStats } from '@/components/dashboard-stats';
import { PayrollOverview } from '@/components/payroll-overview';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'checkin' | 'dashboard' | 'payroll'>('checkin');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-200 transition-colors flex flex-col">
      {/* Gradient Header with Logo & Real-time Clock */}
      <header className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 text-xl font-bold backdrop-blur-sm">M</div>
            <h1 className="text-xl font-bold tracking-tight">MIS CPP</h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden sm:block text-right">
              <p className="text-sm text-indigo-100 font-medium">
                {mounted ? time.toLocaleDateString('km-KH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : '...'}
              </p>
              <p className="text-lg font-bold tracking-wider">
                {mounted ? time.toLocaleTimeString('km-KH') : '...'}
              </p>
            </div>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              title={isDarkMode ? 'Light Mood' : 'Duck Mood'}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Greeting Hero */}
        <section className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-2">
            <div className="h-16 w-16 overflow-hidden rounded-full border-4 border-indigo-100 dark:border-indigo-900 shadow-md flex-shrink-0">
              <div className="flex h-full w-full items-center justify-center bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-2xl font-bold">
                A
              </div>
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                សួស្តី, Admin (អ្នកគ្រប់គ្រង) 👋
              </h2>
              <p className="mt-1 text-slate-600 dark:text-slate-400 text-lg">
                សូមស្វាគមន៍មកកាន់ប្រព័ន្ធគ្រប់គ្រងវត្តមាន និងប្រាក់ខែ
              </p>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto hide-scrollbar">
          <button 
            onClick={() => setActiveTab('checkin')}
            className={`flex items-center gap-2 py-4 px-6 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'checkin' ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <UserCheck className="w-5 h-5" /> កត់ត្រាវត្តមាន
          </button>
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 py-4 px-6 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'dashboard' ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" /> ផ្ទាំងគ្រប់គ្រង
          </button>
          <button 
            onClick={() => setActiveTab('payroll')}
            className={`flex items-center gap-2 py-4 px-6 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'payroll' ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <CircleDollarSign className="w-5 h-5" /> ប្រាក់បៀវត្សរ៍
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 sm:p-8 transition-colors">
          {activeTab === 'checkin' && <CheckInPanel />}
          {activeTab === 'dashboard' && <DashboardStats />}
          {activeTab === 'payroll' && <PayrollOverview />}
        </div>
      </main>
    </div>
  );
}
