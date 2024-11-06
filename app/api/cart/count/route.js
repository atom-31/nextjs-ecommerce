// app/api/cart/count/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Adjust the path to your Prisma client
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth'; // Adjust path to your auth options

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    // Fetch the total quantity of items in the user's cart
    const cartItems = await prisma.cart.findMany({
      where: { userId },
      select: { quantity: true }
    });

    // Calculate the total count of items
    const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return NextResponse.json({ count: totalCount }, { status: 200 });
  } catch (error) {
    console.error('Error fetching cart count:', error);
    return NextResponse.json({ message: 'Error fetching cart count' }, { status: 500 });
  }
}
