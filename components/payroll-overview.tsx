'use client';

import { DollarSign, Download, Filter, Search, ChevronRight } from 'lucide-react';

export function PayrollOverview() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">គ្រប់គ្រងប្រាក់ខែ</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">ខែ កញ្ញា ឆ្នាំ ២០២៦</p>
        </div>
        
        <div className="flex gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <Filter className="w-4 h-4" />
            <span className="font-medium">ចម្រោះ</span>
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            <span className="font-medium">ទាញយក PDF</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-200">
          <p className="text-indigo-100 font-medium mb-1">ប្រាក់ខែសរុប (Net Total)</p>
          <h3 className="text-3xl font-bold">$៤៥,២៥០.០០</h3>
          <div className="mt-4 pt-4 border-t border-white/20 flex justify-between text-sm text-indigo-50">
            <span>បុគ្គលិក ១៥០ នាក់</span>
            <span>១០០% បានគណនា</span>
          </div>
        </div>
        
        <div className="glass-card flex flex-col justify-between rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300">
              <DollarSign className="w-5 h-5" />
            </div>
            <p className="text-slate-600 dark:text-slate-400 font-medium">ប្រាក់ខែគោល (Base)</p>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">$៤៨,០០០.០០</h3>
        </div>

        <div className="glass-card flex flex-col justify-between rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-50 dark:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400">
              <DollarSign className="w-5 h-5" />
            </div>
            <p className="text-slate-600 dark:text-slate-400 font-medium">កាត់កង (Deductions)</p>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">$២,៧៥០.០០</h3>
          <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">មកយឺត និងអវត្តមាន</p>
        </div>
      </div>

      {/* Payroll Table */}
      <div className="glass-card mt-8 flex-1 flex flex-col overflow-hidden rounded-2xl">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
            <input 
              type="text" 
              placeholder="ស្វែងរកឈ្មោះ..." 
              className="w-full pl-9 pr-4 py-2 bg-white/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all dark:text-slate-200"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-900/80">
              <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-500">
                <th className="py-3 px-6 font-medium">ឈ្មោះបុគ្គលិក</th>
                <th className="py-3 px-6 font-medium">តួនាទី</th>
                <th className="py-3 px-6 font-medium text-right">ប្រាក់ខែគោល</th>
                <th className="py-3 px-6 font-medium text-right text-red-500">កាត់កង</th>
                <th className="py-3 px-6 font-medium text-right text-green-600">ប្រាក់ខែសុទ្ធ</th>
                <th className="py-3 px-6 font-medium text-center">ស្ថានភាព</th>
                <th className="py-3 px-6"></th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-800/50">
              {[
                { name: 'សុខ សាន់', role: 'គ្រូបង្រៀន', base: 400, deduction: 0, net: 400, status: 'paid' },
                { name: 'ចាន់ មករា', role: 'រដ្ឋបាល', base: 350, deduction: 0, net: 350, status: 'paid' },
                { name: 'សោភា ទេវី', role: 'គ្រូបង្រៀន', base: 400, deduction: 15, net: 385, status: 'pending' },
                { name: 'មាស សំណាង', role: 'គណនេយ្យ', base: 500, deduction: 25, net: 475, status: 'pending' },
              ].map((emp, i) => (
                <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer">
                  <td className="py-4 px-6 font-medium text-slate-800 dark:text-slate-200">{emp.name}</td>
                  <td className="py-4 px-6 text-slate-500 dark:text-slate-400">{emp.role}</td>
                  <td className="py-4 px-6 text-right font-medium text-slate-700 dark:text-slate-300">${emp.base.toFixed(2)}</td>
                  <td className="py-4 px-6 text-right text-red-500 dark:text-red-400">{emp.deduction > 0 ? `-$${emp.deduction.toFixed(2)}` : '-'}</td>
                  <td className="py-4 px-6 text-right font-bold text-slate-900 dark:text-slate-100">${emp.net.toFixed(2)}</td>
                  <td className="py-4 px-6 text-center">
                    {emp.status === 'paid' ? (
                      <span className="px-2.5 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 rounded-full text-xs font-medium">បានបើក</span>
                    ) : (
                      <span className="px-2.5 py-1 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 rounded-full text-xs font-medium">រង់ចាំ</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
