# E-Commerce Backend Platform

A robust and scalable backend system for a full-featured e-commerce application. Built with Node.js, TypeScript, and Prisma, this project provides all the essential APIs for managing products, inventory, sales, customers, and more. It is containerized with Docker for easy setup and deployment.

## Features

- **Product Management**: Full CRUD APIs for products, categories, brands, and attributes.
- **Inventory Control**: Manage stock levels across multiple warehouses and stores.
- **Sales & Orders**: Endpoints for processing sales and tracking order history.
- **Purchasing**: APIs to manage purchase orders from suppliers and track expenses.
- **User & Customer Authentication**: Secure JWT-based authentication for both admin users and customers, with distinct roles and permissions.
- **Promotions**: Create and manage discount coupons.
- **Admin Dashboard**: Aggregated financial and operational data for business insights.
- **Image Handling**: Integrated with ImageKit for efficient image uploads and transformations.
- **Database Management**: Uses Prisma ORM for type-safe database access and schema migrations.

## Tech Stack

- **Backend**: [Node.js](https://nodejs.org/) with [Express.js](https://expressjs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (recommended)
- **Containerization**: [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- **Package Manager**: [pnpm](https://pnpm.io/)

---

## Getting Started

Follow these instructions to get the project running on your local machine for development and testing.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [pnpm](https://pnpm.io/installation)
- [Docker](https://www.docker.com/get-started)

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd ecommerce-backend-work
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory by copying the example.
You will need to provide your own database connection string and secrets.

```bash
# .env
# --- Database ---
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# --- JWT Secrets ---
JWT_SECRET="your-super-secret-key"
JWT_REFRESH_SECRET="your-super-secret-refresh-key"
ACCESS_TOKEN_EXPIRY="15m"
REFRESH_TOKEN_EXPIRY="7d"

# --- ImageKit ---
IMAGEKIT_PUBLIC_KEY="your-imagekit-public-key"
IMAGEKIT_PRIVATE_key="your-imagekit-private-key"
IMAGEKIT_URL_ENDPOINT="your-imagekit-url-endpoint"

# --- Server ---
PORT=3000
```

### 4. Run Database Migrations

Prisma will use the `schema.prisma` file to set up your database schema.

```bash
pnpm prisma migrate dev
```

### 5. Start the Development Server

This will start the server with `ts-node-dev` for live reloading.

```bash
pnpm dev
```

The server will be running at `http://localhost:3000`.

### Alternative: Running with Docker

For a more isolated environment, you can use Docker Compose.

1.  Ensure your `.env` file is created and configured.
2.  Build and run the containers in detached mode:

```bash
docker-compose up --build -d
```

The application will be available at the port specified in your configuration.

---

## API Documentation

A list of available API endpoints and their usage is documented in `ENDPOINTS.md`. For more detailed information on the request/response structure of each controller, see `src/controllers/API_DOCUMENTATION.md`.

## Project Structure

The project follows a modular structure to keep concerns separated and maintainable.

```
src/
├── app.ts                # Express app configuration and middleware
├── server.ts             # Server entry point
├── config/               # Configuration files (DB, imagekit, etc.)
├── controllers/          # Request/response handling logic for each module
├── DB/                   # Database query functions, separated by module
├── middleware/           # Custom Express middleware (auth, error handling)
├── routes/               # API route definitions
├── service/              # Shared services (JWT, password hashing)
└── utils/                # Utility functions
```

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.