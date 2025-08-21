import { Router } from 'express';
import prisma from '../prisma';

const router = Router();

// List products (basic pagination)
router.get('/', async (req, res, next) => {
  try {
    const page = parseInt((req.query.page as string) || '1', 10);
    const pageSize = Math.min(parseInt((req.query.pageSize as string) || '20', 10), 100);
    const skip = (page - 1) * pageSize;

    const [items, total] = await Promise.all([
      prisma.product.findMany({
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
        include: { category: true, images: true },
      }),
      prisma.product.count(),
    ]);

    res.json({ items, total, page, pageSize });
  } catch (err) {
    next(err);
  }
});

// Create product (minimal fields for now)
router.post('/', async (req, res, next) => {
  try {
    const {
      name,
      slug,
      sku,
      price,
      salePrice,
      description,
      shortDescription,
      categoryId,
      stockQuantity,
      manageStock = true,
      status = 'DRAFT',
      visibility = 'PUBLIC',
      images = [],
    } = req.body || {};

    if (!name || !slug || !price || !categoryId) {
      return res.status(400).json({ message: 'name, slug, price, categoryId are required' });
    }

    const created = await prisma.product.create({
      data: {
        name,
        slug,
        sku,
        price,
        salePrice,
        description,
        shortDescription,
        categoryId,
        stockQuantity: stockQuantity ?? 0,
        manageStock,
        status,
        visibility,
        images: images?.length
          ? { createMany: { data: images.map((i: any, idx: number) => ({ url: i.url, alt: i.alt ?? null, position: i.position ?? idx })) } }
          : undefined,
      },
      include: { category: true, images: true },
    });

    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

// Update product
router.put('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const data = req.body || {};

    // For simplicity, not updating images in this handler
    delete data.images;

    const updated = await prisma.product.update({
      where: { id },
      data,
      include: { category: true, images: true },
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// Delete product
router.delete('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);

    // Delete images first due to FK
    await prisma.product_image.deleteMany({ where: { productId: id } });
    await prisma.product.delete({ where: { id } });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;
