import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

type Sale = {
  id: number;
  uuid: string;
  date: string;
  customer?: { id: number; fullName: string } | null;
  totalAmount: string;
  _count?: { items: number };
};

const Sales: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<Sale[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewId, setViewId] = useState<number | null>(null);
  const [viewData, setViewData] = useState<any | null>(null);

  const fetchList = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:4000/api/sales?page=${page}&pageSize=${pageSize}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Failed to load sales');
      setItems(data.items || []);
      setTotal(data.total || 0);
    } catch (e: any) {
      setError(e.message || 'Failed to load sales');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (viewId == null) return;
    (async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/sales/${viewId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || 'Failed to load sale');
        setViewData(data.item);
      } catch (e) {
        setViewData(null);
      }
    })();
  }, [viewId]);

  const onDelete = async (id: number) => {
    if (!confirm('Delete this sale?')) return;
    try {
      const res = await fetch(`http://localhost:4000/api/sales/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d?.message || 'Failed to delete');
      }
      fetchList();
    } catch (e: any) {
      alert(e.message || 'Failed to delete');
    }
  };

  const pageCount = useMemo(() => Math.ceil(total / pageSize) || 1, [total, pageSize]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="mx-auto w-full max-w-6xl">
          <div className="rounded-md border border-gray-200 bg-white">
            <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b bg-white px-4 py-3 md:px-6 md:py-4">
              <h1 className="text-[22px] font-bold text-gray-900">Sales</h1>
              <button
                type="button"
                onClick={() => navigate('/admin/sales/new')}
                className="inline-flex items-center rounded-md bg-cyan-600 px-3 py-2 text-[13px] font-semibold text-white hover:bg-cyan-500"
              >
                Add New
              </button>
            </div>

            {error && (
              <div className="m-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">{error}</div>
            )}

            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-[13px]">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-4 py-2">Invoice</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Customer</th>
                    <th className="px-4 py-2 text-right">Items</th>
                    <th className="px-4 py-2 text-right">Total</th>
                    <th className="px-4 py-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((s) => (
                    <tr key={s.id} className="border-t">
                      <td className="px-4 py-2 font-mono">{s.uuid}</td>
                      <td className="px-4 py-2">{new Date(s.date).toLocaleDateString()}</td>
                      <td className="px-4 py-2">{s.customer?.fullName || '-'}</td>
                      <td className="px-4 py-2 text-right">{s._count?.items ?? '-'}</td>
                      <td className="px-4 py-2 text-right">${Number(s.totalAmount).toFixed(2)}</td>
                      <td className="px-4 py-2 text-right space-x-2">
                        <button className="text-cyan-700 hover:underline" onClick={() => setViewId(s.id)}>View</button>
                        <button className="text-gray-700 hover:underline" onClick={() => navigate(`/admin/sales/${s.id}/edit`)}>Edit</button>
                        <button className="text-red-600 hover:underline" onClick={() => onDelete(s.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                  {items.length === 0 && !loading && (
                    <tr>
                      <td className="px-4 py-6 text-center text-gray-500" colSpan={6}>No sales found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between p-4 text-[13px]">
              <div>Page {page} of {pageCount}</div>
              <div className="space-x-2">
                <button disabled={page<=1} onClick={() => setPage((p)=> Math.max(1, p-1))} className="rounded border px-3 py-1 disabled:opacity-50">Prev</button>
                <button disabled={page>=pageCount} onClick={() => setPage((p)=> Math.min(pageCount, p+1))} className="rounded border px-3 py-1 disabled:opacity-50">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {viewId != null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={()=> setViewId(null)}>
          <div className="w-full max-w-2xl rounded-md bg-white" onClick={(e)=> e.stopPropagation()}>
            <div className="flex items-center justify-between border-b px-4 py-3">
              <div className="font-semibold">Sale Detail</div>
              <button onClick={()=> setViewId(null)} className="text-gray-600">✕</button>
            </div>
            <div className="p-4 text-[13px]">
              {!viewData ? (
                <div>Loading...</div>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div><span className="text-gray-500">Invoice:</span> <span className="font-mono">{viewData.uuid}</span></div>
                    <div><span className="text-gray-500">Date:</span> {new Date(viewData.date).toLocaleDateString()}</div>
                    <div><span className="text-gray-500">Customer:</span> {viewData.customer?.fullName || '-'}</div>
                    <div><span className="text-gray-500">Total:</span> ${Number(viewData.totalAmount).toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="mb-2 font-medium">Items</div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-left text-[13px]">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-3 py-2">Product</th>
                            <th className="px-3 py-2">Unit</th>
                            <th className="px-3 py-2 text-right">Qty</th>
                            <th className="px-3 py-2 text-right">Unit Price</th>
                            <th className="px-3 py-2 text-right">Line Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {viewData.items?.map((it: any) => (
                            <tr key={it.id} className="border-t">
                              <td className="px-3 py-2">{it.productName}</td>
                              <td className="px-3 py-2">{it.unit || '-'}</td>
                              <td className="px-3 py-2 text-right">{it.quantity}</td>
                              <td className="px-3 py-2 text-right">${Number(it.unitPrice).toFixed(2)}</td>
                              <td className="px-3 py-2 text-right">${Number(it.lineTotal).toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-end border-t px-4 py-3">
              <button className="rounded border px-3 py-1" onClick={()=> setViewId(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sales;
