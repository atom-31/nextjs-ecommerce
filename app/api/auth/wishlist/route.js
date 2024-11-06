import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { userId, productId } = req.body;

  if (req.method === 'POST') {
    const wishlistItem = await prisma.wishlist.create({
      data: {
        userId,
        productId,
      },
    });
    res.json(wishlistItem);
  } else if (req.method === 'GET') {
    const wishlistItems = await prisma.wishlist.findMany({
      where: { userId },
    });
    res.json(wishlistItems);
  } else if (req.method === 'DELETE') {
    await prisma.wishlist.deleteMany({
      where: { userId, productId },
    });
    res.status(204).end();
  }
}
