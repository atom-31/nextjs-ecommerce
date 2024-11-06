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
    console.error('Detailed error while adding to cart:', {
      message: error.message,
      stack: error.stack,
      context: { userId, productId, quantity },
    });
    return NextResponse.json({ message: 'Error adding to cart' }, { status: 500 });
  }
}

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    // Fetch cart items for the current user
    const cartItems = await prisma.cart.findMany({
      where: { userId },
      select: {
        productId: true,
        quantity: true,
      },
    });

    return NextResponse.json({ items: cartItems }, { status: 200 });
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return NextResponse.json({ message: 'Error fetching cart items' }, { status: 500 });
  }
}