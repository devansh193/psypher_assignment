# Psypher - Tier-Based Event Management Platform

A modern Next.js application that provides tier-based access to events with user authentication and dynamic content filtering.

## 🌟 Features

- **Authentication**: Secure user authentication with Clerk.dev
- **Tier-Based Access**: Users have different access levels (Free, Silver, Gold, Platinum)
- **Event Management**: Browse and view events based on your tier level
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Real-time Updates**: React Query for efficient data fetching and caching
- **Database Integration**: PostgreSQL with Drizzle ORM
- **Tier Upgrades**: Users can upgrade their membership tier

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4, Radix UI
- **Authentication**: Clerk.dev
- **Database**: PostgreSQL (Supabase), Drizzle ORM
- **State Management**: TanStack React Query
- **Deployment**: Vercel-ready

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18+ or Bun
- A PostgreSQL database (Supabase recommended)
- A Clerk.dev account

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/devansh193/psypher_assignment.git
cd psypher_assignment
```

### 2. Install Dependencies

```bash
# Using Bun (recommended)
bun install

# Or using npm
npm install

# Or using yarn
yarn install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Database
DATABASE_URL=your_postgresql_connection_string

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

# Optional
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Set Up Clerk Authentication

1. Go to [Clerk.dev](https://clerk.dev) and create a new application
2. Copy your publishable key and secret key to the `.env.local` file
3. Configure the sign-in and sign-up URLs in your Clerk dashboard:
   - Sign-in URL: `/sign-in`
   - Sign-up URL: `/sign-up`
   - After sign-in URL: `/`
   - After sign-up URL: `/`

### 5. Set Up Database

#### Option A: Using Supabase (Recommended)

1. Go to [Supabase](https://supabase.com) and create a new project
2. Copy the PostgreSQL connection string from your Supabase dashboard
3. Add the connection string to your `.env.local` file as `DATABASE_URL`

#### Option B: Local PostgreSQL

1. Install PostgreSQL locally
2. Create a new database for the project
3. Update the `DATABASE_URL` in `.env.local` with your local connection string

### 6. Database Setup

Push the database schema:

```bash
# Using Bun
bun run db:push

# Using npm
npm run db:push
```

Seed the database with sample events:

```bash
# Using Bun
bun run db:seed

# Using npm
npm run db:seed
```

### 7. Start the Development Server

```bash
# Using Bun
bun dev

# Using npm
npm run dev

# Using yarn
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Authentication pages
│   ├── (routes)/            # Main application routes
│   ├── api/                 # API routes
│   └── globals.css          # Global styles
├── components/              # Reusable UI components
│   └── ui/                  # Shadcn UI components
├── modules/                 # Feature-based modules
│   ├── auth/               # Authentication components
│   ├── event/              # Event-related components
│   ├── main/               # Main layout components
│   └── user/               # User-related components
├── db/                     # Database configuration
│   ├── schema.ts           # Database schema
│   └── seed.ts             # Database seeding
├── lib/                    # Utility functions
├── action/                 # Server actions
└── middleware.ts           # Next.js middleware
```

## 🎯 Usage

### User Tiers

The application supports four user tiers:

1. **Free**: Access to free events only
2. **Silver**: Access to free and silver events
3. **Gold**: Access to free, silver, and gold events
4. **Platinum**: Access to all events

### Upgrading Tiers

Users can upgrade their tier using the "Upgrade" dropdown in the navigation bar. The upgrade is processed immediately and reflected in the user's session.

### Event Access

Events are filtered based on the user's tier level. Users can only see events for their current tier and below.

## 🛠️ Available Scripts

```bash
# Development
bun dev                # Start development server
bun build             # Build for production
bun start             # Start production server

# Database
bun run db:push       # Push database schema
bun run db:seed       # Seed database with sample data

# Code Quality
bun run lint          # Run ESLint
```

## 🔧 Configuration

### Database Schema

The application uses the following main database table:

```sql
CREATE TABLE event (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  event_date TIMESTAMP NOT NULL,
  image_url TEXT NOT NULL,
  tier ENUM('free', 'silver', 'gold', 'platinum') NOT NULL,
  time TEXT NOT NULL,
  location TEXT NOT NULL,
  price TEXT NOT NULL,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);
```

### Middleware Configuration

The application uses Clerk middleware to protect routes. Public routes include:
- `/` (home page)
- `/sign-in`
- `/sign-up`
- `/terms`
- `/privacy`

All other routes require authentication.

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify your `DATABASE_URL` is correct
   - Ensure your database is running and accessible

2. **Clerk Authentication Issues**
   - Check your Clerk keys in `.env.local`
   - Verify the URLs in your Clerk dashboard match your configuration

3. **Build Errors**
   - Clear `.next` directory: `rm -rf .next`
   - Reinstall dependencies: `rm -rf node_modules && bun install`

### Environment Variables

Make sure all required environment variables are set:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `DATABASE_URL`

## 📝 API Endpoints

- `POST /api/tier` - Set initial user tier to "free"
- `POST /api/upgrade` - Upgrade user tier

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request


## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the React framework
- [Clerk.dev](https://clerk.dev/) for authentication
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Drizzle ORM](https://orm.drizzle.team/) for database management
- [TanStack React Query](https://tanstack.com/query) for data fetching
