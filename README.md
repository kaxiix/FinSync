# FinX - Modern Finance Platform

FinX is a cutting-edge personal finance application with an integrated AI assistant. It helps users manage their finances, track spending, set savings goals, and get personalized financial advice with beautiful animations and visual effects.

## Features

- **Financial Dashboard**: Track your income, expenses, and savings in one place
- **AI Assistant**: Get personalized financial advice from Fin, your AI financial advisor
- **Transaction Tracking**: Log and categorize your transactions
- **Savings Goals**: Set and track progress towards your financial goals
- **Daily Questionnaire**: Build financial habits with daily check-ins
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Advanced Animations**: Beautiful motion effects and transitions
- **Visual Effects**: Particle systems and dynamic backgrounds

## Tech Stack

- Next.js 15+
- TypeScript
- TailwindCSS
- Framer Motion
- Supabase (Authentication & Database)
- Grok & Groq (AI capabilities)
- Vercel Blob (File storage)
- Neon Postgres (Database)
- Upstash Redis (Caching)
- Recharts (Data visualization)

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see `.env.example`)
4. Run the development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

Create a `.env.local` file with the following variables:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
GROQ_API_KEY=your_groq_api_key
XAI_API_KEY=your_grok_api_key
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
\`\`\`

## Project Structure

\`\`\`
/app - Next.js app directory
  /api - API routes
  /dashboard - Dashboard page
  /activity - Activity/transactions page
  /questionnaire - Daily questionnaire page
  /settings - User settings page
/components - React components
  /ui - UI components
  /dashboard - Dashboard-specific components
  /activity - Activity-specific components
  /settings - Settings-specific components
  /shared - Shared components
  /auth - Authentication components
/contexts - React contexts
/hooks - Custom React hooks
/lib - Utility functions and services
/types - TypeScript type definitions
\`\`\`

## License

MIT
\`\`\`

Now, let's update the app layout metadata:
