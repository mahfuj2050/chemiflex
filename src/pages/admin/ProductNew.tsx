import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

type Category = { id: number; name: string; slug: string };

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const ProductNew: React.FC = () => {
  const navigate = useNavigate();

  // Basic
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);
  const [sku, setSku] = useState<string>('');

  // Pricing
  const [price, setPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');

  // Stock
  const [manageStock, setManageStock] = useState(true);
  const [stockQuantity, setStockQuantity] = useState('0');

  // Meta
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED' | 'TRASH'>('DRAFT');
  const [visibility, setVisibility] = useState<'PUBLIC' | 'PRIVATE' | 'PASSWORD'>('PUBLIC');

  // Details
  const [description, setDescription] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [weight, setWeight] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');

  // Category
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-generate slug from name only if user hasn't modified slug manually
  useEffect(() => {
    if (!slugTouched) setSlug(slugify(name));
  }, [name, slugTouched]);

  // Auto-generate SKU (UUID) on first render
  useEffect(() => {
    setSku(uuidv4());
  }, []);

  // Load categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/categories');
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || 'Failed to load categories');
        setCategories(data.items || []);
      } catch (e) {
        // Show inline but non-blocking
        // eslint-disable-next-line no-console
        console.error(e);
      }
    };
    loadCategories();
  }, []);

  const canSubmit = useMemo(() => {
    return (
      !!name && !!slug && !!price && !!categoryId && (!manageStock || (!!stockQuantity && Number(stockQuantity) >= 0))
    );
  }, [name, slug, price, categoryId, manageStock, stockQuantity]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!canSubmit) {
      setError('Please fill all required fields');
      return;
    }
    try {
      setLoading(true);
      const payload: any = {
        name,
        slug,
        sku, // can be edited by user if desired
        price: Number(price),
        salePrice: salePrice ? Number(salePrice) : undefined,
        description: description || undefined,
        shortDescription: shortDescription || undefined,
        status,
        visibility,
        manageStock,
        stockQuantity: manageStock ? Number(stockQuantity || 0) : 0,
        weight: weight ? Number(weight) : undefined,
        length: length ? Number(length) : undefined,
        width: width ? Number(width) : undefined,
        height: height ? Number(height) : undefined,
        categoryId: Number(categoryId),
      };

      const res = await fetch('http://localhost:4000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Create failed');
      navigate('/admin/products');
    } catch (err: any) {
      setError(err.message || 'Create failed');
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
              <h1 className="text-[22px] font-bold text-gray-900">Add New Product</h1>
              <button
                onClick={() => navigate('/admin/products')}
                type="button"
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-[13px] font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={onSubmit} className="p-6 md:p-8 space-y-5 w-full">
              {error && <div className="text-[13px] text-red-600">{error}</div>}

              {/* Basic */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-[13px]"
                    placeholder="Product Name"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-1">Slug *</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => {
                      setSlugTouched(true);
                      setSlug(e.target.value);
                    }}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-[13px]"
                    placeholder="unique-product-slug"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-1">SKU</label>
                  <input
                    type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-[13px]"
                    placeholder="Auto-generated UUID"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-1">Category *</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-[13px] bg-white"
                  >
                    <option value="">Select category…</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-1">Price *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-[13px]"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-1">Sale Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-[13px]"
                    placeholder="0.00"
                  />
                </div>
                <div className="flex items-center gap-3 pt-6">
                  <input id="manageStock" type="checkbox" checked={manageStock} onChange={(e) => setManageStock(e.target.checked)} />
                  <label htmlFor="manageStock" className="text-[13px] text-gray-700">Manage Stock</label>
                </div>
              </div>

              {manageStock && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[13px] font-medium text-gray-700 mb-1">Stock Quantity *</label>
                    <input
                      type="number"
                      value={stockQuantity}
                      onChange={(e) => setStockQuantity(e.target.value)}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-[13px]"
                      placeholder="0"
                    />
                  </div>
                </div>
              )}

              {/* Dimensions & Weight */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-1">Weight</label>
                  <input
                    type="number"
                    step="0.01"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-[13px]"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-1">Length</label>
                  <input
                    type="number"
                    step="0.01"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-[13px]"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-1">Width</label>
                  <input
                    type="number"
                    step="0.01"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-[13px]"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-1">Height</label>
                  <input
                    type="number"
                    step="0.01"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-[13px]"
                  />
                </div>
              </div>

              {/* Status & Visibility */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-[13px] bg-white"
                  >
                    <option value="DRAFT">DRAFT</option>
                    <option value="PUBLISHED">PUBLISHED</option>
                    <option value="TRASH">TRASH</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-1">Visibility</label>
                  <select
                    value={visibility}
                    onChange={(e) => setVisibility(e.target.value as any)}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-[13px] bg-white"
                  >
                    <option value="PUBLIC">PUBLIC</option>
                    <option value="PRIVATE">PRIVATE</option>
                    <option value="PASSWORD">PASSWORD</option>
                  </select>
                </div>
              </div>

              {/* Descriptions */}
              <div>
                <label className="block text-[13px] font-medium text-gray-700 mb-1">Short Description</label>
                <input
                  type="text"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-[13px]"
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-[13px] min-h-[120px]"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading || !canSubmit}
                  className="inline-flex items-center gap-2 rounded-md bg-cyan-600 px-4 py-2 text-[13px] font-semibold text-white hover:bg-cyan-500 disabled:opacity-60"
                >
                  {loading ? 'Saving…' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductNew;
