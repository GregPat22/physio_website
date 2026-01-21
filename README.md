# Physiotherapy & Rehabilitation Website

A modern, responsive website for physiotherapy and rehabilitation services built with Next.js.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Package Manager**: pnpm
- **React**: React 19 with React Compiler

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm (install with `npm install -g pnpm`)

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Copy environment variables (if needed):

   ```bash
   cp .env.example .env.local
   ```

4. Run the development server:

   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/              # Next.js App Router pages and layouts
│   ├── layout.tsx    # Root layout
│   ├── page.tsx      # Home page
│   └── globals.css   # Global styles
├── components/       # React components
│   └── ui/          # shadcn/ui components
├── lib/             # Utility functions
│   └── utils.ts     # Common utilities (cn helper)
└── hooks/           # Custom React hooks
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Features

- ✅ Modern Next.js App Router architecture
- ✅ TypeScript for type safety
- ✅ Tailwind CSS v4 for styling
- ✅ shadcn/ui component library
- ✅ Responsive design
- ✅ Dark mode support (via CSS variables)
- ✅ Optimized fonts with next/font

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/physio_website)
