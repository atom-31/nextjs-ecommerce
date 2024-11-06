# Ecommerce Site

A simple ecommerce site built with Next.js, Prisma, and NextAuth. This project features user authentication, cart management, and product listing using a fake API.

## Prerequisites

- **Node.js** (v14 or higher)
- **SQLite** (for local development database)

## Getting Started

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/ecommerce-site.git
   cd ecommerce-site
   
2. **Set Up Environment Variables**

    Create a `.env` file in the root directory and add the required variables:
    
    ```env
    DATABASE_URL="file:./dev.db"  # SQLite database file
    NEXTAUTH_SECRET="your-secret"
    NEXT_PUBLIC_FAKE_API_URL="https://fakestoreapi.com"  # Example API URL
    ```
    To generate a secure `NEXTAUTH_SECRET` for your application, you can use the following method:
  
      ### Using OpenSSL
      If you have OpenSSL installed, you can generate a secure random secret by running:
      
      ```bash
      openssl rand -base64 32
      ```


3. **Install Dependencies**
 
   ```env
   npm install
    ```
   
5. **Set Up Prisma**
   
   Generate Prisma client and migrate the SQLite database schema:
   
   ```env
    npx prisma generate
    npx prisma migrate dev --name init
    ```
6. **Run the Development Server**

   Start the Next.js development server:
    ```env
    npm run dev
   
