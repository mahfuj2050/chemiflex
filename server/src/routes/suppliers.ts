import { Router } from 'express';
import prisma from '../prisma';

const router = Router();

// GET /api/suppliers - list suppliers (basic fields)
router.get('/', async (req, res, next) => {
  try {
    const page = parseInt((req.query.page as string) || '1', 10);
    const pageSize = Math.min(parseInt((req.query.pageSize as string) || '20', 10), 100);
    const skip = (page - 1) * pageSize;

    const [items, total] = await Promise.all([
      prisma.supplier.findMany({
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          company: true,
          address: true,
          createdAt: true,
        },
      }),
      prisma.supplier.count(),
    ]);

    res.json({ items, total, page, pageSize });
  } catch (err) {
    next(err);
  }
});

// POST /api/suppliers - create a new supplier
router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone, company, address, notes, preferredCategoryId, preferredProductId } = (req.body || {}) as {
      name?: string;
      email?: string | null;
      phone?: string | null;
      company?: string | null;
      address?: string | null;
      notes?: string | null;
      preferredCategoryId?: number | string | null;
      preferredProductId?: number | string | null;
    };

    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ message: 'name is required' });
    }

    const created = await prisma.supplier.create({
      data: {
        name: name.trim(),
        email: email ? String(email) : null,
        phone: phone ? String(phone) : null,
        company: company ? String(company) : null,
        address: address ? String(address) : null,
        notes: notes ? String(notes) : null,
        preferredCategoryId: preferredCategoryId ? Number(preferredCategoryId) : null,
        preferredProductId: preferredProductId ? Number(preferredProductId) : null,
      },
      select: { id: true, name: true, email: true, preferredCategoryId: true, preferredProductId: true },
    });

    res.status(201).json({ item: created });
  } catch (err: any) {
    if (err?.code === 'P2002') {
      return res.status(409).json({ message: 'Supplier with this email already exists' });
    }
    next(err);
  }
});

export default router;
