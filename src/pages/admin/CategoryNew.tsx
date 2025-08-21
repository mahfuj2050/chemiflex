import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Category = { id: number; name: string; slug: string };

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const AdminCategoryNew: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);
  const [description, setDescription] = useState('');
  const [parentId, setParentId] = useState('');

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slugTouched) setSlug(slugify(name));
  }, [name, slugTouched]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/categories');
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || 'Failed to load categories');
        setCategories(data.items || []);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    };
    load();
  }, []);

  const canSubmit = useMemo(() => !!name && !!slug, [name, slug]);

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
        description: description || undefined,
        parentId: parentId ? Number(parentId) : undefined,
      };
      const res = await fetch('http://localhost:4000/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Create failed');
      navigate('/admin/categories');
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
              <h1 className="text-[22px] font-bold text-gray-900">Add Category</h1>
              <button
                type="button"
                onClick={() => navigate('/admin/categories')}
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-[13px] font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={onSubmit} className="p-6 md:p-8 space-y-5 w-full">
              {error && <div className="text-[13px] text-red-600">{error}</div>}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-[13px]"
                    placeholder="Category Name"
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
                    placeholder="unique-category-slug"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-1">Parent Category</label>
                  <select
                    value={parentId}
                    onChange={(e) => setParentId(e.target.value)}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-[13px] bg-white"
                  >
                    <option value="">None</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
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
                  {loading ? 'Saving…' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCategoryNew;
