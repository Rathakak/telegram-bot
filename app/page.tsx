'use client';

import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  UserCheck, 
  CircleDollarSign,
  Users,
  Moon,
  Sun
} from 'lucide-react';
import { CheckInPanel } from '@/components/check-in-panel';
import { DashboardStats } from '@/components/dashboard-stats';
import { PayrollOverview } from '@/components/payroll-overview';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'checkin' | 'dashboard' | 'payroll'>('checkin');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-200 transition-colors">
      <aside className="gradient-sidebar flex w-64 flex-col p-6 text-white shrink-0">
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 text-xl font-bold">M</div>
          <h1 className="text-xl font-bold tracking-tight">MIS CPP</h1>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-3 rounded-lg p-3 transition-colors ${activeTab === 'dashboard' ? 'bg-white/10' : 'opacity-70 hover:bg-white/5'}`}
          >
            <LayoutDashboard className="h-5 w-5 opacity-80" /> ផ្ទាំងគ្រប់គ្រង
          </button>
          <button 
            onClick={() => setActiveTab('checkin')}
            className={`flex items-center gap-3 rounded-lg p-3 transition-colors ${activeTab === 'checkin' ? 'bg-white/10' : 'opacity-70 hover:bg-white/5'}`}
          >
            <UserCheck className="h-5 w-5 opacity-80" /> កត់ត្រាវត្តមាន
          </button>
          <button 
            onClick={() => setActiveTab('payroll')}
            className={`flex items-center gap-3 rounded-lg p-3 transition-colors ${activeTab === 'payroll' ? 'bg-white/10' : 'opacity-70 hover:bg-white/5'}`}
          >
            <CircleDollarSign className="h-5 w-5 opacity-80" /> ប្រាក់បៀវត្សរ៍
          </button>

          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="flex items-center gap-3 rounded-lg p-3 mt-auto opacity-70 hover:bg-white/5 transition-colors"
          >
            {isDarkMode ? <Sun className="h-5 w-5 opacity-80" /> : <Moon className="h-5 w-5 opacity-80" />} 
            {isDarkMode ? 'Light Mood' : 'Duck Mood'}
          </button>
        </nav>

        <div className="mt-4 rounded-xl bg-white/10 p-4">
          <p className="text-xs opacity-60">ស្ថាប័នបច្ចុប្បន្ន</p>
          <select className="bg-transparent text-white font-medium outline-none appearance-none cursor-pointer w-full mt-1">
            <option value="school_a" className="text-slate-900">សាលារៀន A</option>
            <option value="company_b" className="text-slate-900">ក្រុមហ៊ុន B</option>
          </select>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden bg-slate-50 dark:bg-slate-900 transition-colors">
        <header className="flex h-20 shrink-0 items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-8 transition-colors">
          <div>
            <h2 className="text-2xl font-bold text-indigo-950 dark:text-indigo-400">
              {activeTab === 'checkin' && 'កត់ត្រាវត្តមាន'}
              {activeTab === 'dashboard' && 'ទិដ្ឋភាពទូទៅ'}
              {activeTab === 'payroll' && 'គ្រប់គ្រងប្រាក់ខែ'}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {activeTab === 'checkin' && 'អនុញ្ញាតឱ្យបុគ្គលិកកត់ត្រាវត្តមាន'}
              {activeTab === 'dashboard' && `របាយការណ៍វត្តមានប្រចាំថ្ងៃ - ${new Date().toLocaleDateString('km-KH', { dateStyle: 'full' })}`}
              {activeTab === 'payroll' && 'សង្ខេបប្រាក់បៀវត្សរ៍ និងការកាត់កង'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-indigo-100 dark:border-indigo-900">
              <div className="flex h-full w-full items-center justify-center bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-bold">A</div>
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-auto p-8">
          {activeTab === 'checkin' && <CheckInPanel />}
          {activeTab === 'dashboard' && <DashboardStats />}
          {activeTab === 'payroll' && <PayrollOverview />}
        </div>
      </main>
    </div>
  );
}
