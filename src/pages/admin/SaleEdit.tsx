import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

type Option = { id: number; name: string };

type Line = {
  id: string; // local key
  productId?: number | '';
  productName: string;
  unit?: string;
  quantity: number;
  unitPrice: number;
  backendId?: number; // to display existing but we replace all on save
};

const SaleEdit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const saleId = Number(id);
  const [uuid, setUuid] = useState('');
  const [date, setDate] = useState<string>('');
  const [customerId, setCustomerId] = useState<number | ''>('');
  const [address, setAddress] = useState('');
  const [customers, setCustomers] = useState<Option[]>([]);
  const [products, setProducts] = useState<Option[]>([]);
  const [lines, setLines] = useState<Line[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // fetch customers (first 100)
    fetch('http://localhost:4000/api/customers?pageSize=100')
      .then(r => r.json())
      .then(d => setCustomers((d.items || []).map((c: any) => ({ id: c.id, name: c.fullName }))))
      .catch(() => {});
    // fetch products (first 200)
    fetch('http://localhost:4000/api/products?pageSize=200')
      .then(r => r.json())
      .then(d => setProducts((d.items || []).map((p: any) => ({ id: p.id, name: p.name }))))
      .catch(() => {});
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:4000/api/sales/${saleId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || 'Failed to load sale');
        const s = data.item;
        setUuid(s.uuid || '');
        setDate(s.date ? new Date(s.date).toISOString().slice(0,10) : '');
        setCustomerId(s.customer?.id ?? '');
        setAddress(s.address || '');
        setLines((s.items || []).map((it: any) => ({
          id: crypto.randomUUID(),
          backendId: it.id,
          productId: it.productId ?? '',
          productName: it.productName || '',
          unit: it.unit || '',
          quantity: it.quantity ?? 0,
          unitPrice: Number(it.unitPrice || 0),
        })));
      } catch (e: any) {
        setError(e.message || 'Failed to load sale');
      } finally {
        setLoading(false);
      }
    })();
  }, [saleId]);

  const addLine = () => {
    setLines(ls => [...ls, { id: crypto.randomUUID(), productId: '', productName: '', unit: '', quantity: 1, unitPrice: 0 }]);
  };

  const removeLine = (id: string) => setLines(ls => ls.filter(l => l.id !== id));

  const updateLine = (id: string, patch: Partial<Line>) => {
    setLines(ls => ls.map(l => l.id === id ? { ...l, ...patch } : l));
  };

  const lineTotal = (l: Line) => Number(l.quantity || 0) * Number(l.unitPrice || 0);

  const totalAmount = useMemo(() => lines.reduce((s, l) => s + lineTotal(l), 0), [lines]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!lines.length || lines.every(l => !l.productName && !l.productId)) {
      setError('Please add at least one line item with a product.');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        uuid: uuid || undefined,
        date: date ? new Date(date).toISOString() : undefined,
        customerId: customerId || undefined,
        address: address || undefined,
        items: lines.map(l => ({
          productId: l.productId || undefined,
          productName: l.productName || (products.find(p => p.id === l.productId)?.name ?? ''),
          unit: l.unit || undefined,
          quantity: Number(l.quantity || 0),
          unitPrice: Number(l.unitPrice || 0),
        })),
      };
      const res = await fetch(`http://localhost:4000/api/sales/${saleId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Failed to update sale');
      navigate('/admin/sales');
    } catch (e: any) {
      setError(e.message || 'Failed to update sale');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="mx-auto w-full max-w-6xl">
          <div className="rounded-md border border-gray-200 bg-white">
            <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b bg-white px-4 py-3 md:px-6 md:py-4">
              <h1 className="text-[22px] font-bold text-gray-900">Edit Sale</h1>
              <button type="button" onClick={() => navigate('/admin/sales')} className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-[13px] font-semibold text-gray-700 hover:bg-gray-50">Cancel</button>
            </div>

            <form onSubmit={onSubmit} className="space-y-4 p-4 md:p-6">
              {error && (<div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">{error}</div>)}

              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <div className="md:col-span-2">
                  <label className="mb-1 block text-[13px] font-medium text-gray-700">Invoice No (UUID)</label>
                  <input className="w-full rounded-md border px-3 py-2 text-[13px] font-mono" value={uuid} onChange={(e)=> setUuid(e.target.value)} />
                </div>
                <div>
                  <label className="mb-1 block text-[13px] font-medium text-gray-700">Date</label>
                  <input type="date" className="w-full rounded-md border px-3 py-2 text-[13px]" value={date} onChange={(e)=> setDate(e.target.value)} />
                </div>
                <div>
                  <label className="mb-1 block text-[13px] font-medium text-gray-700">Customer</label>
                  <select className="w-full rounded-md border px-3 py-2 text-[13px] bg-white" value={customerId} onChange={(e)=> setCustomerId(e.target.value ? Number(e.target.value) : '')}>
                    <option value="">-- Select --</option>
                    {customers.map(c => (<option key={c.id} value={c.id}>{c.name}</option>))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-[13px] font-medium text-gray-700">Address</label>
                <input className="w-full rounded-md border px-3 py-2 text-[13px]" value={address} onChange={(e)=> setAddress(e.target.value)} />
              </div>

              <div className="mt-2">
                <div className="mb-2 text-[13px] font-medium text-gray-700">Items</div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-[13px]">
                    <thead className="bg-gray-50 text-gray-600">
                      <tr>
                        <th className="px-3 py-2">Product</th>
                        <th className="px-3 py-2">Unit</th>
                        <th className="px-3 py-2 text-right">Qty</th>
                        <th className="px-3 py-2 text-right">Unit Price</th>
                        <th className="px-3 py-2 text-right">Line Total</th>
                        <th className="px-3 py-2 text-right"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {lines.map(l => (
                        <tr key={l.id} className="border-t">
                          <td className="px-3 py-2">
                            <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
                              <select className="rounded-md border px-2 py-1 bg-white" value={l.productId ?? ''} onChange={(e)=> updateLine(l.id, { productId: e.target.value ? Number(e.target.value) : '' })}>
                                <option value="">-- Select --</option>
                                {products.map(p => (<option key={p.id} value={p.id}>{p.name}</option>))}
                              </select>
                              <input className="rounded-md border px-2 py-1" placeholder="or free text" value={l.productName} onChange={(e)=> updateLine(l.id, { productName: e.target.value })} />
                            </div>
                          </td>
                          <td className="px-3 py-2"><input className="w-24 rounded-md border px-2 py-1" value={l.unit || ''} onChange={(e)=> updateLine(l.id, { unit: e.target.value })} /></td>
                          <td className="px-3 py-2 text-right"><input type="number" className="w-24 rounded-md border px-2 py-1 text-right" value={l.quantity} onChange={(e)=> updateLine(l.id, { quantity: Number(e.target.value) })} /></td>
                          <td className="px-3 py-2 text-right"><input type="number" step="0.01" className="w-28 rounded-md border px-2 py-1 text-right" value={l.unitPrice} onChange={(e)=> updateLine(l.id, { unitPrice: Number(e.target.value) })} /></td>
                          <td className="px-3 py-2 text-right">${(Number(l.quantity||0)*Number(l.unitPrice||0)).toFixed(2)}</td>
                          <td className="px-3 py-2 text-right"><button type="button" className="text-red-600 hover:underline" onClick={()=> removeLine(l.id)}>Remove</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-2">
                  <button type="button" onClick={addLine} className="rounded-md border px-3 py-1 text-[13px]">+ Add Row</button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-6 border-t pt-4">
                <div className="text-right text-[14px]">
                  <div className="text-gray-500">Total Amount</div>
                  <div className="text-[18px] font-semibold">${totalAmount.toFixed(2)}</div>
                </div>
                <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-md bg-cyan-600 px-4 py-2 text-[13px] font-semibold text-white hover:bg-cyan-500 disabled:opacity-60">
                  {saving ? 'Saving…' : 'Update Sale'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleEdit;
