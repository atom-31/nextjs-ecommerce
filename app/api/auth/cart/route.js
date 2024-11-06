import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { userId, productId, quantity } = req.body;

  if (req.method === 'POST') {
    const cartItem = await prisma.cart.create({
      data: {
        userId,
        productId,
        quantity,
      },
    });
    res.json(cartItem);
  } else if (req.method === 'GET') {
    const cartItems = await prisma.cart.findMany({
      where: { userId },
    });
    res.json(cartItems);
  } else if (req.method === 'DELETE') {
    await prisma.cart.deleteMany({
      where: { userId, productId },
    });
    res.status(204).end();
  }
}
