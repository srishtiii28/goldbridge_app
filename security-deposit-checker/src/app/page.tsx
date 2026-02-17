'use client';

import { useState } from 'react';
import { securityDepositLaws, SecurityDepositLaw } from '@/data/securityDepositLaws';
import StateSelector from '@/components/StateSelector';
import ComplianceCard from '@/components/ComplianceCard';
import ComplianceChecklist from '@/components/ComplianceChecklist';
import DepositCalculator from '@/components/DepositCalculator';

export default function Home() {
  const [selectedState, setSelectedState] = useState<SecurityDepositLaw | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 shadow-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                Security Deposit Compliance Checker
              </h1>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
                Stay compliant with security deposit laws across all 50 states
              </p>
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center space-x-2 px-4 py-2.5 bg-goldbridge-gold/10 rounded-lg border border-goldbridge-gold/20">
                <svg className="w-5 h-5 text-goldbridge-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-base font-semibold text-slate-800 dark:text-slate-200">
                  Goldbridge Demo
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* State Selector */}
        <div className="mb-8">
          <StateSelector
            states={securityDepositLaws}
            onSelectState={setSelectedState}
            selectedState={selectedState}
          />
        </div>

        {/* Results */}
        {selectedState ? (
          <div className="space-y-6">
            {/* Overview Card */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    {selectedState.state} Security Deposit Laws
                  </h2>
                  <p className="text-base text-slate-600 dark:text-slate-400">
                    Compliance requirements for property owners in {selectedState.state}
                  </p>
                </div>
                <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-full text-base font-semibold">
                  {selectedState.stateCode}
                </span>
              </div>
            </div>

            {/* Compliance Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ComplianceCard
                title="Maximum Deposit"
                value={selectedState.maxDeposit}
                icon="💰"
                color="blue"
              />

              <ComplianceCard
                title="Interest Required"
                value={selectedState.interestRequired ? "Yes" : "No"}
                subtitle={selectedState.interestRate}
                icon="📈"
                color={selectedState.interestRequired ? "green" : "gray"}
              />

              <ComplianceCard
                title="Return Deadline"
                value={selectedState.returnDeadline}
                icon="📅"
                color="purple"
              />

              <ComplianceCard
                title="Holding Account"
                value={selectedState.holdingAccount}
                icon="🏦"
                color="indigo"
              />

              <ComplianceCard
                title="Penalties"
                value={selectedState.penalties}
                icon="⚠️"
                color="red"
              />

              {selectedState.notes && (
                <ComplianceCard
                  title="Additional Notes"
                  value={selectedState.notes}
                  icon="📝"
                  color="yellow"
                />
              )}
            </div>

            {/* Deposit Calculator */}
            <DepositCalculator law={selectedState} />

            {/* Compliance Checklist */}
            <ComplianceChecklist law={selectedState} />

            {/* Disclaimer */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-amber-600 dark:text-amber-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-sm font-medium text-amber-800 dark:text-amber-500">Legal Disclaimer</h3>
                  <p className="mt-1 text-sm text-amber-700 dark:text-amber-400">
                    This tool provides general information only. Laws change frequently and vary by locality.
                    Always consult with a qualified attorney or local housing authority for specific legal advice.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-block p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
              <svg className="w-16 h-16 mx-auto text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                Select a State
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Choose a state from the dropdown above to view security deposit compliance requirements
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-slate-600 dark:text-slate-400">
            Built for Goldbridge • Helping property owners stay compliant and optimize their operations
          </p>
        </div>
      </footer>
    </main>
  );
}
