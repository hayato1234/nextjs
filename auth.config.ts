import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    // set the default login page
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
  // You need to create a separate file for the bcrypt package.
  // This is because bcrypt relies on Node.js APIs not available in Next.js Middleware.
} satisfies NextAuthConfig;
