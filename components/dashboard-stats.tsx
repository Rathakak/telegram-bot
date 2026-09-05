'use client';

import { Users, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

export function DashboardStats() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">សង្ខេបប្រចាំថ្ងៃ</h2>
          <p className="text-slate-500 mt-1">{new Date().toLocaleDateString('km-KH', { dateStyle: 'full' })}</p>
        </div>
        <button className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg font-medium hover:bg-indigo-100 transition-colors">
          ទាញយករបាយការណ៍
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat Card 1 */}
        <div className="glass-card flex flex-col justify-between rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">បុគ្គលិកសរុប</span>
            <span className="rounded-full bg-blue-100 dark:bg-blue-900/50 px-2 py-1 text-xs text-blue-600 dark:text-blue-400">+2%</span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold dark:text-slate-100">១៥០</span>
            <span className="text-sm text-slate-400 dark:text-slate-500">នាក់</span>
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="glass-card flex flex-col justify-between rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">វត្តមាន (បានចូល)</span>
            <span className="rounded-full bg-green-100 dark:bg-green-900/50 px-2 py-1 text-xs text-green-600 dark:text-green-400">៩៤%</span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold dark:text-slate-100">១៤២</span>
            <span className="text-sm text-slate-400 dark:text-slate-500">នាក់</span>
          </div>
        </div>

        {/* Stat Card 3 */}
        <div className="glass-card flex flex-col justify-between rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">មកយឺត</span>
            <span className="text-xs text-orange-500 dark:text-orange-400">កត់ត្រាបន្ទាប់ពី ៨:០០</span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-orange-500 dark:text-orange-400">៥</span>
            <span className="text-sm text-slate-400 dark:text-slate-500">នាក់</span>
          </div>
        </div>

        {/* Stat Card 4 */}
        <div className="glass-card flex flex-col justify-between rounded-2xl p-6 border-l-4 border-l-red-500 dark:border-l-red-500/80">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">អវត្តមាន</span>
            <span className="text-xs text-red-500 dark:text-red-400">មិនទាន់មានទិន្នន័យ</span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-red-600 dark:text-red-400">៣</span>
            <span className="text-sm text-slate-400 dark:text-slate-500">នាក់</span>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="glass-card mt-8 flex-1 flex flex-col overflow-hidden rounded-2xl">
        <div className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-4">
          <h3 className="font-bold dark:text-slate-200">កំណត់ត្រាវត្តមានថ្មីៗ</h3>
        </div>
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-900/80">
              <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-500">
                <th className="px-6 py-3 font-medium">ឈ្មោះបុគ្គលិក</th>
                <th className="px-6 py-3 font-medium">ម៉ោងចូល</th>
                <th className="px-6 py-3 font-medium">វិធីសាស្ត្រ</th>
                <th className="px-6 py-3 font-medium">ស្ថានភាព</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-[10px] dark:text-indigo-300">ស.ស</div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-800 dark:text-slate-200">សុខ សាន់</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-mono text-slate-600 dark:text-slate-400">០៧:៤៥ ព្រឹក</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 rounded bg-violet-50 dark:bg-violet-900/50 px-2 py-0.5 text-[10px] font-medium text-violet-700 dark:text-violet-300">ស្កេនមុខ</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[11px] font-semibold text-green-600 dark:text-green-400">ទាន់ពេល</span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] dark:text-slate-400">ច.ម</div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-800 dark:text-slate-200">ចាន់ មករា</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-mono text-slate-600 dark:text-slate-400">០៧:៥៨ ព្រឹក</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 rounded bg-blue-50 dark:bg-blue-900/50 px-2 py-0.5 text-[10px] font-medium text-blue-700 dark:text-blue-300">GPS</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[11px] font-semibold text-green-600 dark:text-green-400">ទាន់ពេល</span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] dark:text-slate-400">ស.ទ</div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-800 dark:text-slate-200">សោភា ទេវី</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-mono text-slate-600 dark:text-slate-400">០៨:១៥ ព្រឹក</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 rounded bg-amber-50 dark:bg-amber-900/50 px-2 py-0.5 text-[10px] font-medium text-amber-700 dark:text-amber-400">QR កូដ</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[11px] font-semibold text-orange-500 dark:text-orange-400">មកយឺត</span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] dark:text-slate-400">ម.ស</div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-800 dark:text-slate-200">មាស សំណាង</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-mono text-slate-600 dark:text-slate-400">០៨:៣០ ព្រឹក</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 rounded bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-700 dark:text-slate-300">NFC</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[11px] font-semibold text-orange-500 dark:text-orange-400">មកយឺត</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
