// app/api/cart/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;

  const { productId, quantity } = await request.json();

  if (!productId || !quantity) {
    return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
  }

  try {
    // Check if item already in cart
    const existingCartItem = await prisma.cart.findFirst({
      where: { userId, productId },
    });

    if (existingCartItem) {
      // Update quantity if item exists
      const updatedCartItem = await prisma.cart.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + quantity },
      });
      return NextResponse.json(updatedCartItem, { status: 200 });
    } else {
      // Add new item to cart
      const newCartItem = await prisma.cart.create({
        data: { userId, productId, quantity },
      });
      return NextResponse.json(newCartItem, { status: 201 });
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json({ message: 'Error adding to cart' }, { status: 500 });
  }
}
