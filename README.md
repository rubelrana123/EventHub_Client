# EventHub Frontend

Frontend application for EventHub, built with Next.js 16, TypeScript, and Tailwind CSS.

## Overview
EventHub Frontend provides:
- Public pages for browsing and viewing event details
- Authentication flows (register, login, password reset)
- Role-based dashboards for `ADMIN`, `HOST`, and `PARTICIPATOR`
- Event booking and payment flow integration
- Analytics-style dashboard sections using chart components

## Tech Stack
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Recharts
- React Hook Form + Zod
- Radix UI + shadcn-style components

## Project Structure
```txt
src/
  app/
    (commonLayout)/          # Public pages (home, events, auth, contact)
    (dashboardLayout)/       # Protected dashboard pages and role layouts
  components/
    shared/                  # Reusable UI and event components
    ui/                      # Primitive UI components
  services/                  # Server actions / API service wrappers
  lib/                       # Utilities (fetch helpers, auth helpers)
```

## Environment Variables
Create `.env` in `EventHub/`:

```env
NEXT_PUBLIC_BASE_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
JWT_SECRET=your_jwt_secret_for_server_side_decode
NODE_ENV=development
```

Notes:
- `NEXT_PUBLIC_BASE_API_URL` is used by `serverFetch` for backend API calls.
- Keep `JWT_SECRET` aligned with backend if frontend decodes JWT server-side.

## Getting Started
From `EventHub/`:

```bash
# install
bun install
# or
npm install

# run dev server
bun run dev
# or
npm run dev
```

Open `http://localhost:3000`.

## Available Scripts
- `bun run dev` / `npm run dev`: start development server
- `bun run build` / `npm run build`: production build
- `bun run start` / `npm run start`: run production server
- `bun run lint` / `npm run lint`: run lint checks

## Backend Dependency
This frontend expects the backend API to be running (default):
- `http://localhost:5000/api/v1`

If your backend runs elsewhere, update `.env` values accordingly.

## Build and Deployment
- Build command: `bun run build` (or `npm run build`)
- Start command: `bun run start` (or `npm run start`)
- Ensure all required env variables are configured in your deployment platform.

## Common Troubleshooting
- API not loading in frontend but works in Postman:
  - Verify `NEXT_PUBLIC_BASE_API_URL` is correct.
  - Confirm CORS allows frontend origin (`http://localhost:3000`).
  - Check route path spelling (`/event`, not `/events` if backend uses singular route).
- Auth/session issues:
  - Check cookie/token domain and secure flags.
  - Ensure frontend and backend JWT secrets are consistent where decoding is required.
