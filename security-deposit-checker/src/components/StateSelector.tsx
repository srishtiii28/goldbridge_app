'use client';

import { SecurityDepositLaw } from '@/data/securityDepositLaws';

interface StateSelectorProps {
  states: SecurityDepositLaw[];
  onSelectState: (state: SecurityDepositLaw | null) => void;
  selectedState: SecurityDepositLaw | null;
}

export default function StateSelector({ states, onSelectState, selectedState }: StateSelectorProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
      <label htmlFor="state-select" className="block text-base font-semibold text-slate-700 dark:text-slate-300 mb-3">
        Select Property State
      </label>
      <div className="relative">
        <select
          id="state-select"
          className="block w-full px-4 py-4 pr-10 text-lg border-2 border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-goldbridge-gold focus:border-transparent rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white appearance-none cursor-pointer transition-colors font-medium"
          value={selectedState?.stateCode || ''}
          onChange={(e) => {
            const state = states.find(s => s.stateCode === e.target.value);
            onSelectState(state || null);
          }}
        >
          <option value="">-- Choose a state --</option>
          {states.map((state) => (
            <option key={state.stateCode} value={state.stateCode}>
              {state.state} ({state.stateCode})
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
        {states.length} states with detailed compliance information
      </p>
    </div>
  );
}
