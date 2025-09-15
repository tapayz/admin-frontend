# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application using TypeScript and Tailwind CSS v4, bootstrapped with `create-next-app`. The project uses the App Router architecture with components located in `src/app/`.

## Development Commands

- **Start development server**: `npm run dev` (starts on http://localhost:3000)
- **Build for production**: `npm run build`
- **Start production server**: `npm start`
- **Run linting**: `npm run lint`

## Architecture

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4 with PostCSS
- **Fonts**: Geist Sans and Geist Mono from next/font/google
- **TypeScript**: Strict mode enabled with path mapping (`@/*` → `./src/*`)
- **Structure**: Standard App Router layout with `src/app/` containing pages and layouts

## Key Configuration

- ESLint uses Next.js core web vitals and TypeScript configs
- TypeScript target: ES2017 with modern module resolution
- Path aliases: `@/*` maps to `./src/*`
- PostCSS processes Tailwind CSS v4

## Development Notes

The main entry point is `src/app/page.tsx` with global layout in `src/app/layout.tsx`. The application uses CSS variables for theming and includes dark mode support via Tailwind's dark variant.