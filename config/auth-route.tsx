export const AuthRoutes = {
  login: {
    path: "/login",
    title: "Welcome back",
    description: "Enter your credentials to access your account",
  },
  signup: {
    path: "/signup",
    title: "Create an account",
    description: "Sign up for a new account to get started",
  },
  forgotPassword: {
    path: "/forgot-password",
    title: "Reset password",
    description: "Enter your email to reset your password",
  },
  "navigationmenu": {
    path: "/nav-menu",
    title: "Navigation Menu",
    description: "Explore different navigation options",
  },
} as const

/**
 * A type representing the keys of the `routes` object.
 * 
 * This type is derived from the keys of the `routes` constant,
 * ensuring type safety when referencing route names throughout the application.
 * 
 * @example
 * // Possible values: 'login' | 'signup' | 'forgotPassword'
 * const routeName: RouteKey = 'login';
 */
export type RouteKey = keyof typeof AuthRoutes;