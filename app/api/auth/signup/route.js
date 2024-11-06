import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();


export async function POST(req) {
  try {
    // Parse the incoming request payload
    const data = await req.json();
    console.log("Received data:", data);

    // Validate required fields
    if (!data || !data.email || !data.password || !data.name) {
      console.error("Missing required fields:", data);
      return new Response(
        JSON.stringify({ message: 'Missing required fields' }),
        { status: 400 }
      );
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      console.error("User already exists:", data.email);
      return new Response(
        JSON.stringify({ message: 'User already exists' }),
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create the user in the database
    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        role: "user" // Default role for new users
      },
    });

    console.log("User created successfully:", newUser);

    // Return a successful response
    return new Response(
      JSON.stringify({ message: 'User created successfully', user: newUser }),
      { status: 201 }
    );

  } catch (error) {
    console.error("Error in signup route:", error);

    // Check for specific Prisma errors, e.g., unique constraint violations
    if (error.code === 'P2002') {
      return new Response(
        JSON.stringify({ message: 'A user with this email already exists.' }),
        { status: 409 }
      );
    }

    // General error handling
    return new Response(
      JSON.stringify({ message: 'Internal server error' }),
      { status: 500 }
    );
  }
}
