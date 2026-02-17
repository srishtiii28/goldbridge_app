'use client';

import { useState } from 'react';
import { SecurityDepositLaw } from '@/data/securityDepositLaws';

interface DepositCalculatorProps {
  law: SecurityDepositLaw;
}

export default function DepositCalculator({ law }: DepositCalculatorProps) {
  const [monthlyRent, setMonthlyRent] = useState<string>('');
  const [depositAmount, setDepositAmount] = useState<string>('');
  const [isFurnished, setIsFurnished] = useState(false);

  const calculateCompliance = () => {
    const rent = parseFloat(monthlyRent);
    const deposit = parseFloat(depositAmount);

    if (isNaN(rent) || isNaN(deposit) || rent <= 0 || deposit <= 0) {
      return null;
    }

    // Parse max deposit limit
    let maxAllowed = 0;
    const maxDepositStr = law.maxDeposit.toLowerCase();

    // State-specific parsing
    if (law.stateCode === 'CA') {
      maxAllowed = isFurnished ? rent * 3 : rent * 2;
    } else if (law.stateCode === 'AZ') {
      maxAllowed = rent * 1.5;
    } else if (law.stateCode === 'MA') {
      maxAllowed = rent * 1;
    } else if (law.stateCode === 'PA') {
      // Assuming first year
      maxAllowed = rent * 2;
    } else if (law.stateCode === 'NC') {
      // Assuming longer term lease
      maxAllowed = rent * 2;
    } else if (law.stateCode === 'MI') {
      maxAllowed = rent * 1.5;
    } else if (law.stateCode === 'VA') {
      maxAllowed = rent * 2;
    } else {
      // No statutory limit - show warning
      return {
        isCompliant: true,
        maxAllowed: null,
        excess: 0,
        hasLimit: false,
        ratio: deposit / rent
      };
    }

    const isCompliant = deposit <= maxAllowed;
    const excess = Math.max(0, deposit - maxAllowed);

    return {
      isCompliant,
      maxAllowed,
      excess,
      hasLimit: true,
      ratio: deposit / rent
    };
  };

  const result = calculateCompliance();

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
      <div className="flex items-center mb-4">
        <svg className="w-6 h-6 text-goldbridge-gold mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Deposit Compliance Calculator
        </h2>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Monthly Rent Amount
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
            <input
              type="number"
              value={monthlyRent}
              onChange={(e) => setMonthlyRent(e.target.value)}
              placeholder="2000"
              className="w-full pl-8 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-goldbridge-gold focus:border-transparent dark:bg-slate-700 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Security Deposit Amount
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
            <input
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              placeholder="4000"
              className="w-full pl-8 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-goldbridge-gold focus:border-transparent dark:bg-slate-700 dark:text-white"
            />
          </div>
        </div>

        {law.stateCode === 'CA' && (
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="furnished"
              checked={isFurnished}
              onChange={(e) => setIsFurnished(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-goldbridge-gold focus:ring-goldbridge-gold"
            />
            <label htmlFor="furnished" className="text-sm text-slate-700 dark:text-slate-300">
              Property is furnished
            </label>
          </div>
        )}
      </div>

      {result && (
        <div className={`p-4 rounded-lg ${
          result.hasLimit && !result.isCompliant
            ? 'bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800'
            : 'bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800'
        }`}>
          <div className="flex items-start space-x-3">
            {result.hasLimit && !result.isCompliant ? (
              <svg className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
            <div className="flex-1">
              {result.hasLimit ? (
                <>
                  {result.isCompliant ? (
                    <>
                      <h3 className="font-bold text-green-900 dark:text-green-100 mb-2">
                        ✓ Compliant with {law.state} Law
                      </h3>
                      <div className="text-sm text-green-800 dark:text-green-200 space-y-1">
                        <p>• Deposit: ${parseFloat(depositAmount).toFixed(2)} ({result.ratio.toFixed(2)}x monthly rent)</p>
                        <p>• Maximum allowed: ${result.maxAllowed?.toFixed(2)}</p>
                        <p>• Room under limit: ${result.maxAllowed ? (result.maxAllowed - parseFloat(depositAmount)).toFixed(2) : 'N/A'}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="font-bold text-red-900 dark:text-red-100 mb-2">
                        ⚠ EXCEEDS LEGAL LIMIT
                      </h3>
                      <div className="text-sm text-red-800 dark:text-red-200 space-y-1">
                        <p>• Your deposit: ${parseFloat(depositAmount).toFixed(2)}</p>
                        <p>• Maximum allowed: ${result.maxAllowed?.toFixed(2)}</p>
                        <p className="font-bold">• EXCESS AMOUNT: ${result.excess.toFixed(2)}</p>
                        <div className="mt-3 p-3 bg-red-100 dark:bg-red-900/40 rounded">
                          <p className="font-bold mb-1">⚠ Potential Penalty:</p>
                          <p className="text-xs">{law.penalties}</p>
                        </div>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2">
                    No Statutory Limit in {law.state}
                  </h3>
                  <div className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                    <p>• Deposit: ${parseFloat(depositAmount).toFixed(2)} ({result.ratio.toFixed(2)}x monthly rent)</p>
                    <p>• {law.state} has no maximum deposit limit</p>
                    <p className="mt-2 text-xs">
                      <strong>Note:</strong> While legal, high deposits may deter tenants.
                      Market standard is typically 1-2 months rent.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {!result && monthlyRent && depositAmount && (
        <p className="text-sm text-slate-500 dark:text-slate-400 italic">
          Enter valid amounts to see compliance analysis
        </p>
      )}
    </div>
  );
}
