import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prisma';
import { env } from '../config/env';

const auth = Router();

auth.post('/register', async (req, res, next) => {
  try {
    const { email, password, fullName, roleName = 'STAFF' } = req.body as {
      email: string; password: string; fullName: string; roleName?: 'ADMIN' | 'STAFF' | 'VIEWER';
    };

    if (!email || !password || !fullName) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ message: 'Email already registered' });

    let role = await prisma.role.findFirst({ where: { name: roleName } });
    if (!role) role = await prisma.role.create({ data: { name: roleName } });

    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hash, fullName, roleId: role.id },
      select: { id: true, email: true, fullName: true, role: true }
    });

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

auth.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    const user = await prisma.user.findUnique({ where: { email }, include: { role: true } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ sub: String(user.id), role: user.role.name }, env.JWT_SECRET, { expiresIn: '7d' });
    res.json({
      token,
      user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role.name }
    });
  } catch (err) {
    next(err);
  }
});

auth.get('/me', async (req, res, next) => {
  try {
    const authz = req.headers.authorization || '';
    const token = authz.startsWith('Bearer ') ? authz.slice(7) : '';
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    const decoded = jwt.verify(token, env.JWT_SECRET);
    if (typeof decoded !== 'object' || !('sub' in decoded) || !decoded.sub) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const userId = Number((decoded as jwt.JwtPayload).sub);
    if (Number.isNaN(userId)) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true, email: true, fullName: true } });
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

export default auth;
