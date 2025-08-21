import { Router } from 'express';
import authRouter from './auth';
import productsRouter from './products';
import categoriesRouter from './categories';
import customersRouter from './customers';
import suppliersRouter from './suppliers';
import salesRouter from './sales';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ ok: true, api: 'v1' });
});

router.use('/auth', authRouter);
router.use('/products', productsRouter);
router.use('/categories', categoriesRouter);
router.use('/customers', customersRouter);
router.use('/suppliers', suppliersRouter);
router.use('/sales', salesRouter);

export default router;
