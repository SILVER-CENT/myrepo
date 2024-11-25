import { ThemeToggle } from "@/components/theme-toggle"
import { AuthCard } from "@/components/auth/auth-card"
import { AuthRoutes } from "@/config/auth-route"

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  // Get current route info from pathname
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/login'
  const currentRoute = Object.values(AuthRoutes).find(route => route.path === pathname) || AuthRoutes.login

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold">Auth System</div>
          </div>
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-6">
        <AuthCard
          title={currentRoute.title}
          description={currentRoute.description}
        >
          {children}
        </AuthCard>
      </main>
      <footer className="border-t py-4">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Auth System. All rights reserved.
        </div>
      </footer>
    </div>
  )
}