import React from 'react';

type Props = {
  lookupQuery: string;
  setLookupQuery: (v: string) => void;
  lookupSearched: string;
  setLookupSearched: (v: string) => void;
  onSearch: (query: string) => void;
};

export default function LookupTab({ lookupQuery, setLookupQuery, lookupSearched, setLookupSearched, onSearch }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900 tracking-tight">Lookup & Investigation</h3>
        <p className="text-xs text-slate-500">Search users, orders, transactions or reference codes for quick investigations.</p>
      </div>

      <div className="bg-white border border-slate-100 rounded-xl p-4">
        <div className="flex gap-2">
          <input
            value={lookupQuery}
            onChange={(e) => setLookupQuery(e.target.value)}
            placeholder="Search by email, order id, tx id or user id"
            className="flex-1 px-3 py-2 border rounded-md"
          />
          <button
            onClick={() => { setLookupSearched(lookupQuery); onSearch(lookupQuery); }}
            className="bg-slate-900 text-white px-4 py-2 rounded-md"
          >
            Search
          </button>
        </div>
        <div className="mt-3 text-xs text-slate-500">
          {lookupSearched ? `Showing results for "${lookupSearched}"` : 'Enter a query and press Search.'}
        </div>

        {/* Placeholder for results — AdminCMS keeps the actual lookup handlers and result rendering centralized. */}
        <div className="mt-4 text-sm text-slate-600">Search results appear here in the main AdminCMS implementation.</div>
      </div>
    </div>
  );
}
