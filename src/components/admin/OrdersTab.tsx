import React from 'react';
import { Order } from '../../types';
import { formatNGT } from '../../lib/dateUtils';
import { Layers } from 'lucide-react';

type Props = {
  orders: Order[];
  ordersQueueLimit: number;
  setOrdersQueueLimit: (fn: ((n:number)=>number) | number) => void;
  setSelectedOrder: (o: Order) => void;
};

export default function OrdersTab({ orders, ordersQueueLimit, setOrdersQueueLimit, setSelectedOrder }: Props) {
  if (!orders || orders.length === 0) {
    return <p className="text-sm text-slate-400 py-12 text-center">No buy/sell orders found in the platform database.</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900 tracking-tight">Order Queue</h3>
        <p className="text-xs text-slate-500">Review transfer proofs, verify receipt timestamps, and authorize payouts.</p>
      </div>

      <div className="divide-y divide-slate-100">
        {orders.slice(0, ordersQueueLimit).map((ord) => {
          return (
            <div key={ord.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-900 text-sm">#{ord.id.substring(0, 6).toUpperCase()}</span>
                  <span className={`inline-flex items-center gap-1 text-[9px] uppercase px-2 py-0.5 rounded-full font-bold ${
                    ord.type === 'buy' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                  }`}>
                    {ord.type === 'buy' ? ord.token === "USDT" ? `Buy USDT` : `Buy ${ord.token}/USDT` : ord.token === "USDT" ? `Sell USDT` : `Sell ${ord.token}/USDT`}
                  </span>
                  <span className={`inline-flex items-center text-[9px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-500`}>
                    {ord.network}
                  </span>
                </div>
                <div className="text-slate-500">
                  User: <span className="font-mono">{ord.userEmail}</span> • {formatNGT(ord.createdAt)}
                </div>
                <div className="font-bold text-slate-700">
                  {ord.cryptoAmount} {ord.token} at ₦{ord.rate}/{ord.token} = <span className="text-emerald-700">₦{ord.ngnAmount.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  {ord.status === 'pending' && (
                    <span className="text-amber-600 bg-amber-50 px-2 py-1 rounded font-bold uppercase tracking-wider text-[10px]">
                      Awaiting action
                    </span>
                  )}
                  {ord.status === 'completed' && (
                    <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded font-bold uppercase tracking-wider text-[10px]">
                      Completed
                    </span>
                  )}
                  {ord.status === 'rejected' && (
                    <span className="text-rose-600 bg-rose-50 px-2 py-1 rounded font-bold uppercase tracking-wider text-[10px]">
                      Rejected
                    </span>
                  )}
                </div>
                
                <button
                  onClick={() => setSelectedOrder(ord)}
                  className="bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-1.5 rounded-lg font-bold transition cursor-pointer"
                >
                  Review Details
                </button>
              </div>
            </div>
          );
        })}

        {orders.length > ordersQueueLimit && (
          <div className="pt-4 border-t border-slate-100 text-center">
            <button
              onClick={() => typeof setOrdersQueueLimit === 'function' ? setOrdersQueueLimit((prev: number) => prev + 5) : setOrdersQueueLimit((ordersQueueLimit as number) + 5)}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-400 bg-slate-50 hover:bg-slate-100 px-5 py-2 rounded-xl"
            >
              Load more orders ({orders.length - ordersQueueLimit} remaining)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
