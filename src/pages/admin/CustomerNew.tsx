import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Option = { id: number; name: string };

const CustomerNew: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [notes, setNotes] = useState('');
  const [preferredCategoryId, setPreferredCategoryId] = useState<string>('');
  const [preferredProductId, setPreferredProductId] = useState<string>('');

  const [categories, setCategories] = useState<Option[]>([]);
  const [products, setProducts] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch('http://localhost:4000/api/categories'),
          fetch('http://localhost:4000/api/products?pageSize=100'),
        ]);
        const catData = await catRes.json();
        const prodData = await prodRes.json();
        if (catRes.ok) setCategories(catData.items || []);
        if (prodRes.ok)
          setProducts(
            (prodData.items || []).map((p: any) => ({ id: p.id, name: p.name }))
          );
      } catch (e) {
        // ignore
      }
    };
    loadOptions();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!fullName.trim()) {
      setError('Full name is required');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('http://localhost:4000/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email: email || undefined,
          phone: phone || undefined,
          company: company || undefined,
          notes: notes || undefined,
          preferredCategoryId: preferredCategoryId ? Number(preferredCategoryId) : undefined,
          preferredProductId: preferredProductId ? Number(preferredProductId) : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Failed to create customer');
      navigate('/admin/customers');
    } catch (e: any) {
      setError(e.message || 'Failed to create customer');
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
              <h1 className="text-[22px] font-bold text-gray-900">Add Customer</h1>
              <button
                type="button"
                onClick={() => navigate('/admin/customers')}
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
                  <label className="mb-1 block text-[13px] font-medium text-gray-700">Full Name *</label>
                  <input
                    className="w-full rounded-md border px-3 py-2 text-[13px]"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[13px] font-medium text-gray-700">Email</label>
                  <input
                    className="w-full rounded-md border px-3 py-2 text-[13px]"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
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
                    placeholder="ACME Inc."
                  />
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

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-[13px] font-medium text-gray-700">Preferred Category</label>
                  <select
                    className="w-full rounded-md border px-3 py-2 text-[13px]"
                    value={preferredCategoryId}
                    onChange={(e) => setPreferredCategoryId(e.target.value)}
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
                    className="w-full rounded-md border px-3 py-2 text-[13px]"
                    value={preferredProductId}
                    onChange={(e) => setPreferredProductId(e.target.value)}
                  >
                    <option value="">-- None --</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-md bg-cyan-600 px-4 py-2 text-[13px] font-semibold text-white hover:bg-cyan-500 disabled:opacity-60"
                >
                  {loading ? 'Saving…' : 'Save Customer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerNew;
