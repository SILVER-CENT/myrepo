export type BaseLayout = 'form' | 'data-view';

export type UserRole = 'admin' | 'maker' | 'checker' | 'viewer';

export interface AuthState {
  isAuthenticated: boolean;
  roles: UserRole[];
  userId: string | null;
}

export interface RouteGuard {
  requireAuth?: boolean;
  allowedRoles?: UserRole[];
  requireMakerChecker?: boolean;
  makerRoles?: UserRole[];
  checkerRoles?: UserRole[];
}

export interface RouteDefinition {
  path: string;
  title: string;
  description?: string;
  baseLayout?: BaseLayout;
  parent?: string;
  icon?: string;
  guard?: RouteGuard;
}

export interface RouteGroup {
  title: string;
  routes: Record<string, RouteDefinition>;
}

export type RouteTree = Record<string, RouteGroup>;

export interface NavigationState {
  currentPath: string;
  baseLayout?: BaseLayout;
  parentPath?: string;
}

export interface MakerCheckerState {
  status: 'pending' | 'approved' | 'rejected';
  makerId?: string;
  checkerId?: string;
  createdAt: Date;
  updatedAt: Date;
}