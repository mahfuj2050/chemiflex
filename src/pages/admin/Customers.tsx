import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Customer = {
  id: number;
  fullName: string;
  email?: string | null;
  phone?: string | null;
  company?: string | null;
  preferredCategory?: { id: number; name: string } | null;
  preferredProduct?: { id: number; name: string } | null;
  createdAt: string;
};

const Customers: React.FC = () => {
  const [items, setItems] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:4000/api/customers');
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || 'Failed to load customers');
        setItems(data.items || []);
      } catch (e: any) {
        setError(e.message || 'Failed to load customers');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="mx-auto w-full max-w-6xl">
          <div className="rounded-md border border-gray-200 bg-white">
            <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b bg-white px-4 py-3 md:px-6 md:py-4">
              <h1 className="text-[22px] font-bold text-gray-900">Customers</h1>
              <button
                onClick={() => navigate('/admin/customers/new')}
                className="inline-flex items-center rounded-md bg-cyan-600 px-3 py-2 text-[13px] font-semibold text-white hover:bg-cyan-500"
              >
                Add Customer
              </button>
            </div>

            <div className="p-4 md:p-6">
              {error && <div className="mb-3 text-[13px] text-red-600">{error}</div>}
              {loading ? (
                <div className="text-[13px] text-gray-600">Loading…</div>
              ) : items.length === 0 ? (
                <div className="text-[13px] text-gray-600">No customers found.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-[13px]">
                    <thead>
                      <tr className="border-b">
                        <th className="px-3 py-2 font-semibold text-gray-700">ID</th>
                        <th className="px-3 py-2 font-semibold text-gray-700">Name</th>
                        <th className="px-3 py-2 font-semibold text-gray-700">Email</th>
                        <th className="px-3 py-2 font-semibold text-gray-700">Phone</th>
                        <th className="px-3 py-2 font-semibold text-gray-700">Company</th>
                        <th className="px-3 py-2 font-semibold text-gray-700">Preferred</th>
                        <th className="px-3 py-2 font-semibold text-gray-700">Created</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((c) => (
                        <tr key={c.id} className="border-b last:border-b-0">
                          <td className="px-3 py-2 text-gray-800">{c.id}</td>
                          <td className="px-3 py-2 text-gray-800">{c.fullName}</td>
                          <td className="px-3 py-2 text-gray-600">{c.email || '-'}</td>
                          <td className="px-3 py-2 text-gray-600">{c.phone || '-'}</td>
                          <td className="px-3 py-2 text-gray-600">{c.company || '-'}</td>
                          <td className="px-3 py-2 text-gray-600">
                            {c.preferredCategory ? `Cat: ${c.preferredCategory.name}` : ''}
                            {c.preferredProduct ? (c.preferredCategory ? ' | ' : '') + `Prod: ${c.preferredProduct.name}` : ''}
                            {!c.preferredCategory && !c.preferredProduct ? '-' : ''}
                          </td>
                          <td className="px-3 py-2 text-gray-600">{new Date(c.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
