import { Router } from 'express';
import prisma from '../prisma';

const router = Router();

// GET /api/categories - list categories (id, name, slug)
router.get('/', async (_req, res, next) => {
  try {
    const items = await prisma.product_category.findMany({
      select: { id: true, name: true, slug: true },
      orderBy: { name: 'asc' },
    });
    res.json({ items });
  } catch (err) {
    next(err);
  }
});

// Helper to slugify strings (simple)
const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

// POST /api/categories - create a new category
router.post('/', async (req, res, next) => {
  try {
    const { name, slug, description, parentId } = req.body || {};
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const finalSlug = (slug && typeof slug === 'string' && slug.trim()) ? slugify(slug) : slugify(name);

    const created = await prisma.product_category.create({
      data: {
        name: name.trim(),
        slug: finalSlug,
        description: description ? String(description) : null,
        parentId: parentId ? Number(parentId) : null,
      },
      select: { id: true, name: true, slug: true },
    });
    res.status(201).json({ item: created });
  } catch (err: any) {
    // Handle unique constraint on slug
    if (err?.code === 'P2002') {
      return res.status(409).json({ message: 'Category with this slug already exists' });
    }
    next(err);
  }
});

export default router;
