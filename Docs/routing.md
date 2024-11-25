## 1. System Architecture

The system is built with a hierarchical structure:
- Route Definitions feed into both Base Router and Secure Router
- Base Router manages Navigation State
- Secure Router manages both Auth State and Maker-Checker State

## 2. Core Components

### Route Definitions
The system uses two types of route definitions:

1. Base Routes:
- Used for public routes
- No authentication required
- Defined in `lib/routing/routes.ts`

2. Secure Routes:
- Protected routes requiring authentication
- Support for role-based access
- Maker-checker workflow integration
- Defined in `lib/routing/secure-routes.ts`

### Routing Hooks

1. Base Router (`useRoute`):
```typescript
const { navigateToRoute, getRouteTitle } = useRoute()

// Basic navigation
navigateToRoute('/user/list')

// Get route information
const pageTitle = getRouteTitle()
```

2. Secure Router (`useSecureRoute`):
```typescript
const { 
  navigateToRoute,
  isAuthorized,
  pendingMakerChecker,
  roles,
  isAuthenticated 
} = useSecureRoute()
```

## 3. Authorization Flow

The authorization flow follows this sequence:
1. User requests navigation
2. SecureRouter checks authentication
3. AuthStore returns auth status
4. Route guards are checked
5. Role validation is performed
6. Navigation is allowed or denied

## 4. Maker-Checker Workflow

The system implements a maker-checker pattern with:

```typescript
interface MakerCheckerState {
  status: 'pending' | 'approved' | 'rejected'
  makerId?: string
  checkerId?: string
  createdAt: Date
  updatedAt: Date
}
```

## 5. Route Guards

Routes can be protected using guard configurations:

```typescript
interface RouteGuard {
  requireAuth?: boolean
  allowedRoles?: UserRole[]
  requireMakerChecker?: boolean
  makerRoles?: UserRole[]
  checkerRoles?: UserRole[]
}
```

Example implementation:
```typescript
const userEntryGuard = {
  requireAuth: true,
  allowedRoles: ['admin', 'maker'],
  requireMakerChecker: true,
  makerRoles: ['maker'],
  checkerRoles: ['checker']
}
```

## 6. Integration with Next.js

The system integrates with Next.js through:
1. Client-side navigation
2. Route protection
3. Layout management
4. Type safety

The layout system is referenced in:

# Next.js Auth Layout Explanation

## Overview
The auth layout (`app/(auth)/layout.tsx`) serves as a template for all authentication-related pages in the application. Let's break down its structure and functionality.

## Layout Structure

```mermaid
graph TD
    A[Root Layout] --> B[Auth Layout]
    B --> C[Login Page]
    B --> D[Signup Page]
    B --> E[Forgot Password Page]
```

## Component Hierarchy

```mermaid
graph TD
    A[AuthLayout] --> B[Header]
    A --> C[Main Content]
    A --> D[Footer]
    B --> E[Logo]
    B --> F[ThemeToggle]
    C --> G[AuthCard]
    G --> H[Dynamic Content]
```

## Key Components

### 1. Route Detection

```typescript
const pathname = typeof window !== 'undefined' ? window.location.pathname : '/login'
const currentRoute = Object.values(routes).find(route => route.path === pathname) || routes.login
```

- Checks if code is running in browser
- Defaults to '/login' during server-side rendering
- Matches current path with routes configuration

### 2. Layout Structure
The layout consists of three main sections:

#### Header

```16:23:app/(auth)/layout.tsx
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold">Auth System</div>
          </div>
          <ThemeToggle />
        </div>
      </header>
```

- Sticky positioning
- Contains app title and theme toggle
- Semi-transparent background with blur effect

#### Main Content

```24:31:app/(auth)/layout.tsx
      <main className="flex-1 flex items-center justify-center p-6">
        <AuthCard 
          title={currentRoute.title}
          description={currentRoute.description}
        >
          {children}
        </AuthCard>
      </main>
```

- Centered content
- Wraps content in AuthCard component
- Dynamic title and description based on route

#### Footer

```32:36:app/(auth)/layout.tsx
      <footer className="border-t py-4">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Auth System. All rights reserved.
        </div>
      </footer>
```

- Copyright information
- Year updates dynamically

## Flow Diagram

```mermaid
sequenceDiagram
    participant User
    participant Router
    participant AuthLayout
    participant AuthCard
    participant Page

    User->>Router: Visits auth route
    Router->>AuthLayout: Loads layout
    AuthLayout->>AuthLayout: Detect current route
    AuthLayout->>AuthCard: Pass route info
    AuthCard->>Page: Render specific page content
```

## Styling Features

1. **Responsive Design**
   - Uses Flexbox for layout
   - Full viewport height (`min-h-screen`)
   - Centered content alignment

2. **Theme Support**
   - Background colors from theme
   - Muted text colors
   - Blur effects for header

3. **Container Structure**
```
┌─────────────────────────┐
│        Header           │
├─────────────────────────┤
│                         │
│                         │
│      Auth Card          │
│                         │
│                         │
├─────────────────────────┤
│        Footer           │
└─────────────────────────┘
```

## Integration Points

1. **Theme System**
   - Integrates with `ThemeToggle` component
   - Uses theme-aware background classes

2. **Routing System**
   - Works with Next.js routing
   - Handles route information via `routes` object

3. **Content Injection**
   - Uses React's children prop for page content
   - Wraps content in `AuthCard` component

## Usage Example

When a user visits `/login`, the layout:
1. Detects the current route
2. Loads appropriate title/description
3. Renders the login page content within the `AuthCard`
4. Maintains consistent header/footer across auth pages

This layout ensures a consistent user experience across all authentication-related pages while maintaining clean separation of concerns and reusable components.

## Best Practices

1. Always use Secure Router for protected routes:
```typescript
const { navigateToRoute, isAuthorized } = useSecureRoute()
```

2. Handle authorization states properly:
```typescript
if (!isAuthorized) {
  return <UnauthorizedView />
}
```

3. Implement proper error handling:
```typescript
try {
  await navigateToRoute('/protected-route')
} catch (error) {
  if (error instanceof AuthorizationError) {
    showToast('Unauthorized access')
  }
}
```
