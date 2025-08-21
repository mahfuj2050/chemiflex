import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Category = { id: number; name: string };
type Product = {
  id: number;
  name: string;
  slug: string;
  sku?: string | null;
  price: string | number;
  stockQuantity: number;
  status: 'DRAFT' | 'PUBLISHED' | 'TRASH';
  category?: Category;
};

const Products: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:4000/api/products?page=1&pageSize=20');
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Failed to load products');
      setItems(data.items || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onDelete = async (id: number) => {
    if (!confirm('Delete this product?')) return;
    try {
      const res = await fetch(`http://localhost:4000/api/products/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Delete failed');
      setItems((prev) => prev.filter((p) => p.id !== id));
    } catch (e: any) {
      alert(e.message || 'Delete failed');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-[22px] font-bold text-gray-900">Products</h1>
        <button
          onClick={() => navigate('/admin/products/new')}
          className="inline-flex items-center gap-2 rounded-md bg-cyan-600 px-3 py-2 text-[13px] font-semibold text-white hover:bg-cyan-500"
        >
          <Plus className="h-4 w-4" /> Add New Product
        </button>
      </div>

      <div className="rounded-md border border-gray-200 bg-white p-0 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <div className="text-[13px] font-semibold text-gray-700">All Products</div>
        </div>
        {loading ? (
          <div className="p-6 text-[13px] text-gray-500">Loading…</div>
        ) : error ? (
          <div className="p-6 text-[13px] text-red-600">{error}</div>
        ) : items.length === 0 ? (
          <div className="p-6 text-[13px] text-gray-600">No products yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-[13px]">
              <thead className="bg-gray-50">
                <tr className="text-left text-gray-600">
                  <th className="px-3 py-2 font-semibold">Name</th>
                  <th className="px-3 py-2 font-semibold">SKU</th>
                  <th className="px-3 py-2 font-semibold">Category</th>
                  <th className="px-3 py-2 font-semibold">Price</th>
                  <th className="px-3 py-2 font-semibold">Stock</th>
                  <th className="px-3 py-2 font-semibold">Status</th>
                  <th className="px-3 py-2 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map((p) => (
                  <tr key={p.id} className="text-gray-700">
                    <td className="px-3 py-2">{p.name}</td>
                    <td className="px-3 py-2">{p.sku || '-'}</td>
                    <td className="px-3 py-2">{p.category?.name || '-'}</td>
                    <td className="px-3 py-2">{typeof p.price === 'string' ? p.price : p.price.toFixed(2)}</td>
                    <td className="px-3 py-2">{p.stockQuantity}</td>
                    <td className="px-3 py-2">{p.status}</td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigate(`/admin/products/${p.id}`)}
                          className="inline-flex items-center rounded border border-gray-300 bg-white px-2 py-1 hover:bg-gray-50"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4 text-gray-700" />
                        </button>
                        <button
                          onClick={() => onDelete(p.id)}
                          className="inline-flex items-center rounded border border-red-200 bg-white px-2 py-1 hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
