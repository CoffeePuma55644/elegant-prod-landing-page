# Project Overview

This is a modern, elegant, and production-ready landing page built with React and Vite. The project emphasizes performance (HMR, fast build), a polished UI (Tailwind CSS + DaisyUI), and smooth animations (Framer Motion). It includes self-hosted fonts, SVG icons, and observability tools for production performance tracking.

**Key Technologies:**
*   **Frontend Framework:** React 19
*   **Build Tool:** Vite 7
*   **Styling:** Tailwind CSS 4, DaisyUI 5
*   **Animations:** Framer Motion / Motion
*   **Icons:** Lucide React
*   **Fonts:** @fontsource/inter, @fontsource/playfair-display
*   **Analytics/Performance:** @vercel/analytics, @vercel/speed-insights
*   **Code Quality:** ESLint 9

# Building and Running

This project uses `pnpm` as its package manager.

**Prerequisites:**
*   Node.js >= 18 (LTS recommended)
*   pnpm >= 8
*   Git

**Quick Start (Development):**
1.  **Install dependencies:**
    ```bash
    pnpm install
    ```
2.  **Run the development server (with HMR):**
    ```bash
    pnpm dev
    ```
    The application will typically be available at `http://localhost:5173`.

**Available Scripts:**
*   `pnpm dev`: Starts the development server.
*   `pnpm build`: Generates an optimized production build.
*   `pnpm preview`: Locally previews the production build.
*   `pnpm lint`: Executes ESLint to check for code quality issues.

# Development Conventions

**Linting and Code Quality:**
*   To check for linting problems:
    ```bash
    pnpm lint
    ```
*   To automatically fix issues where possible:
    ```bash
    pnpm lint -- --fix
    ```

**Contribution Guidelines:**
1.  Create a new branch: `git checkout -b feature/my-feature`
2.  Develop and test locally.
3.  Ensure all linting checks pass: `pnpm lint`
4.  Open a Pull Request with a clear description of your changes.
