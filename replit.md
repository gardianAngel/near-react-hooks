# NEAR React Hooks - Replit Project Guide

## Overview

This is a NEAR React Hooks library project that aims to simplify NEAR Protocol integration for React developers. The project provides a comprehensive set of TypeScript React hooks that reduce boilerplate code from 50+ lines to just 3 lines for common NEAR Protocol operations like wallet connections, smart contract interactions, and transaction tracking.

## System Architecture

### Frontend Architecture
- **React 18** with TypeScript for type safety
- **Vite** as the build tool and development server
- **Tailwind CSS** with shadcn/ui components for styling
- **React Router (Wouter)** for client-side routing
- **TanStack Query** for server state management
- **Custom NEAR React Hooks** for blockchain integration

### Backend Architecture
- **Express.js** server with TypeScript
- **RESTful API** structure with `/api` prefix
- **In-memory storage** with interface for easy database migration
- **Development/production environment separation**

### Database Architecture
- **Drizzle ORM** configured for PostgreSQL
- **Neon Database** integration ready
- **User schema** with username and password fields
- **Migration system** using Drizzle Kit

## Key Components

### NEAR Integration Hooks
- `useNearWallet()` - Wallet connection and management
- `useNearContract()` - Smart contract interactions
- `useNearAccount()` - Account information and balance
- `useNearTransaction()` - Transaction status tracking

### UI Components
- **shadcn/ui component library** with Radix UI primitives
- **Responsive design** with mobile-first approach
- **Dark/light theme** support with system preference detection
- **Toast notifications** for user feedback

### Development Tools
- **TypeScript** for type safety across the stack
- **ESLint** and **Prettier** for code quality
- **Vite plugins** for enhanced development experience
- **Replit integration** with runtime error overlay

## Data Flow

1. **Client-side**: React components use NEAR hooks to interact with blockchain
2. **NEAR Provider**: Manages connection state and provides context to hooks
3. **API Layer**: Express server handles authentication and data persistence
4. **Database**: Drizzle ORM with PostgreSQL for user data
5. **External Services**: NEAR Protocol blockchain interactions

## External Dependencies

### NEAR Protocol Integration
- `@near-js/accounts` - Account management
- `@near-js/crypto` - Cryptographic operations
- `@near-js/keystores` - Key storage
- `@near-js/providers` - RPC providers
- `@near-js/transactions` - Transaction handling
- `@near-js/wallet-account` - Wallet integration

### Database & Storage
- `@neondatabase/serverless` - Neon database client
- `drizzle-orm` - Type-safe ORM
- `drizzle-kit` - Migration tools

### UI & Styling
- `@radix-ui/*` - Accessible UI primitives
- `tailwindcss` - Utility-first CSS framework
- `lucide-react` - Icon library

## Deployment Strategy

### Development
- Run `npm run dev` for local development
- Vite dev server with hot reload
- Express server with TypeScript compilation

### Production Build
- `npm run build` - Builds both frontend and backend
- Frontend: Vite build to `dist/public`
- Backend: ESBuild compilation to `dist/index.js`

### Database Management
- `npm run db:push` - Push schema changes to database
- Environment variable `DATABASE_URL` required for PostgreSQL connection

## Changelog

```
Changelog:
- July 05, 2025: Initial project setup with showcase website
- July 05, 2025: Complete NEAR React Hooks npm package implementation
  • Created comprehensive TypeScript npm package structure
  • Implemented all four core hooks (useNearWallet, useNearAccount, useNearContract, useNearTransaction)
  • Built three complete demo applications with professional styling
  • Added comprehensive test suite with Jest and React Testing Library
  • Configured CI/CD pipeline with automated testing and npm publishing
  • Created detailed documentation including README, API docs, and contributing guidelines
  • Set up build system with Rollup for ESM/CJS support
  • Added TypeScript configuration and type definitions
- July 05, 2025: Critical Community Feedback Integration
  • Received feedback to create interface design proposal before implementation
  • Created comprehensive INTERFACE-DESIGN-PROPOSAL.md with usage examples
  • Prepared package for GitHub deployment first
  • Following community best practice of validating API design before coding
  • Ready for community review and feedback before finalizing implementation
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```