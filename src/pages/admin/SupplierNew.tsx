import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SupplierNew: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [preferredCategoryId, setPreferredCategoryId] = useState<number | ''>('');
  const [preferredProductId, setPreferredProductId] = useState<number | ''>('');
  const [categories, setCategories] = useState<Array<{ id: number; name: string }>>([]);
  const [products, setProducts] = useState<Array<{ id: number; name: string }>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch categories
    fetch('http://localhost:4000/api/categories')
      .then((r) => r.json())
      .then((d) => setCategories(d?.items ?? []))
      .catch(() => {});
    // Fetch products (first 100)
    fetch('http://localhost:4000/api/products?pageSize=100')
      .then((r) => r.json())
      .then((d) => setProducts(d?.items?.map((p: any) => ({ id: p.id, name: p.name })) ?? []))
      .catch(() => {});
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('http://localhost:4000/api/suppliers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email || undefined,
          phone: phone || undefined,
          company: company || undefined,
          address: address || undefined,
          notes: notes || undefined,
          preferredCategoryId: preferredCategoryId || undefined,
          preferredProductId: preferredProductId || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Failed to create supplier');
      navigate('/admin/suppliers');
    } catch (e: any) {
      setError(e.message || 'Failed to create supplier');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="mx-auto w-full max-w-6xl">
          <div className="rounded-md border border-gray-200 bg-white">
            <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b bg-white px-4 py-3 md:px-6 md:py-4">
              <h1 className="text-[22px] font-bold text-gray-900">Add Supplier</h1>
              <button
                type="button"
                onClick={() => navigate('/admin/suppliers')}
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-[13px] font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={onSubmit} className="space-y-4 p-4 md:p-6">
              {error && (
                <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-[13px] font-medium text-gray-700">Name *</label>
                  <input
                    className="w-full rounded-md border px-3 py-2 text-[13px]"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Supplier name"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[13px] font-medium text-gray-700">Email</label>
                  <input
                    className="w-full rounded-md border px-3 py-2 text-[13px]"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="supplier@example.com"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[13px] font-medium text-gray-700">Phone</label>
                  <input
                    className="w-full rounded-md border px-3 py-2 text-[13px]"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 555-1234"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[13px] font-medium text-gray-700">Company</label>
                  <input
                    className="w-full rounded-md border px-3 py-2 text-[13px]"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Company name"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-[13px] font-medium text-gray-700">Address</label>
                <input
                  className="w-full rounded-md border px-3 py-2 text-[13px]"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street, City, State, ZIP"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-[13px] font-medium text-gray-700">Preferred Category</label>
                  <select
                    className="w-full rounded-md border px-3 py-2 text-[13px] bg-white"
                    value={preferredCategoryId}
                    onChange={(e) => {
                      const v = e.target.value;
                      setPreferredCategoryId(v ? Number(v) : '');
                    }}
                  >
                    <option value="">-- None --</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-[13px] font-medium text-gray-700">Preferred Product</label>
                  <select
                    className="w-full rounded-md border px-3 py-2 text-[13px] bg-white"
                    value={preferredProductId}
                    onChange={(e) => {
                      const v = e.target.value;
                      setPreferredProductId(v ? Number(v) : '');
                    }}
                  >
                    <option value="">-- None --</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-[13px] font-medium text-gray-700">Notes</label>
                <textarea
                  className="w-full rounded-md border px-3 py-2 text-[13px]"
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any additional notes"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-md bg-cyan-600 px-4 py-2 text-[13px] font-semibold text-white hover:bg-cyan-500 disabled:opacity-60"
                >
                  {loading ? 'Saving…' : 'Save Supplier'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierNew;
