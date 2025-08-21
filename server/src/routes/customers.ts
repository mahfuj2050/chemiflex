import { Router } from 'express';
import prisma from '../prisma';

const router = Router();

// GET /api/customers - list customers (basic fields)
router.get('/', async (req, res, next) => {
  try {
    const page = parseInt((req.query.page as string) || '1', 10);
    const pageSize = Math.min(parseInt((req.query.pageSize as string) || '20', 10), 100);
    const skip = (page - 1) * pageSize;

    const [items, total] = await Promise.all([
      prisma.customer.findMany({
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          fullName: true,
          email: true,
          phone: true,
          company: true,
          preferredCategory: { select: { id: true, name: true } },
          preferredProduct: { select: { id: true, name: true } },
          createdAt: true,
        },
      }),
      prisma.customer.count(),
    ]);

    res.json({ items, total, page, pageSize });
  } catch (err) {
    next(err);
  }
});

// POST /api/customers - create a new customer
router.post('/', async (req, res, next) => {
  try {
    const {
      fullName,
      email,
      phone,
      company,
      notes,
      preferredCategoryId,
      preferredProductId,
    } = req.body || {};

    if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
      return res.status(400).json({ message: 'fullName is required' });
    }

    const created = await prisma.customer.create({
      data: {
        fullName: fullName.trim(),
        email: email ? String(email) : null,
        phone: phone ? String(phone) : null,
        company: company ? String(company) : null,
        notes: notes ? String(notes) : null,
        preferredCategoryId: preferredCategoryId ? Number(preferredCategoryId) : null,
        preferredProductId: preferredProductId ? Number(preferredProductId) : null,
      },
      select: { id: true, fullName: true, email: true },
    });

    res.status(201).json({ item: created });
  } catch (err: any) {
    // Handle unique constraint on email
    if (err?.code === 'P2002') {
      return res.status(409).json({ message: 'Customer with this email already exists' });
    }
    next(err);
  }
});

export default router;
