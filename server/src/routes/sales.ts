import { Router } from 'express';
import prisma from '../prisma';
import crypto from 'crypto';

const router = Router();

// GET /api/sales - list sales with basic fields
router.get('/', async (req, res, next) => {
  try {
    const page = parseInt((req.query.page as string) || '1', 10);
    const pageSize = Math.min(parseInt((req.query.pageSize as string) || '20', 10), 100);
    const skip = (page - 1) * pageSize;

    const [items, total] = await Promise.all([
      prisma.sale.findMany({
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
        include: {
          customer: { select: { id: true, fullName: true } },
          _count: { select: { items: true } },
        },
      }),
      prisma.sale.count(),
    ]);

    res.json({ items, total, page, pageSize });
  } catch (err) {
    next(err);
  }
});

// GET /api/sales/:id - view a sale
router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const sale = await prisma.sale.findUnique({
      where: { id },
      include: {
        customer: { select: { id: true, fullName: true } },
        items: true,
      },
    });
    if (!sale) return res.status(404).json({ message: 'Sale not found' });
    res.json({ item: sale });
  } catch (err) {
    next(err);
  }
});

// POST /api/sales - create a sale with items
router.post('/', async (req, res, next) => {
  try {
    const {
      uuid,
      date,
      customerId,
      address,
      items,
    } = req.body || {};

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'At least one line item is required' });
    }

    const normalizedItems = items.map((it: any) => {
      const qty = Number(it.quantity || 0);
      const unitPrice = Number(it.unitPrice || 0);
      const lineTotal = qty * unitPrice;
      return {
        productId: it.productId ? Number(it.productId) : null,
        productName: String(it.productName || ''),
        unit: it.unit ? String(it.unit) : null,
        quantity: qty,
        unitPrice,
        lineTotal,
      };
    });

    const totalAmount = normalizedItems.reduce((sum: number, it: any) => sum + Number(it.lineTotal || 0), 0);

    const created = await prisma.sale.create({
      data: {
        uuid: uuid && String(uuid).trim() ? String(uuid).trim() : crypto.randomUUID(),
        date: date ? new Date(date) : new Date(),
        customerId: customerId ? Number(customerId) : null,
        address: address ? String(address) : null,
        totalAmount,
        items: { createMany: { data: normalizedItems } },
      },
      include: { customer: { select: { id: true, fullName: true } }, items: true },
    });

    res.status(201).json({ item: created });
  } catch (err) {
    next(err);
  }
});

// PUT /api/sales/:id - update sale (replace items)
router.put('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { uuid, date, customerId, address, items } = req.body || {};

    if (items && (!Array.isArray(items) || items.length === 0)) {
      return res.status(400).json({ message: 'If provided, items must be a non-empty array' });
    }

    let totalAmount: number | undefined = undefined;
    let createItems: any[] | undefined = undefined;

    if (Array.isArray(items)) {
      const normalizedItems = items.map((it: any) => {
        const qty = Number(it.quantity || 0);
        const unitPrice = Number(it.unitPrice || 0);
        const lineTotal = qty * unitPrice;
        return {
          productId: it.productId ? Number(it.productId) : null,
          productName: String(it.productName || ''),
          unit: it.unit ? String(it.unit) : null,
          quantity: qty,
          unitPrice,
          lineTotal,
        };
      });
      totalAmount = normalizedItems.reduce((sum: number, it: any) => sum + Number(it.lineTotal || 0), 0);
      createItems = normalizedItems;
    }

    const updated = await prisma.$transaction(async (tx) => {
      if (createItems) {
        await tx.sale_item.deleteMany({ where: { saleId: id } });
      }
      const upd = await tx.sale.update({
        where: { id },
        data: {
          uuid: uuid && String(uuid).trim() ? String(uuid).trim() : undefined,
          date: date ? new Date(date) : undefined,
          customerId: customerId !== undefined ? (customerId ? Number(customerId) : null) : undefined,
          address: address !== undefined ? (address ? String(address) : null) : undefined,
          totalAmount: totalAmount !== undefined ? totalAmount : undefined,
          ...(createItems ? { items: { createMany: { data: createItems } } } : {}),
        },
        include: { customer: { select: { id: true, fullName: true } }, items: true },
      });
      return upd;
    });

    res.json({ item: updated });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/sales/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await prisma.sale_item.deleteMany({ where: { saleId: id } });
    await prisma.sale.delete({ where: { id } });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;
