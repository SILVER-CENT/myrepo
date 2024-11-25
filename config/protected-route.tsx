import { RouteTree, BaseLayout } from '@/lib/routing/types';

export const protectedRoutes: RouteTree = {
  dashboard: {
    title: 'Dashboard',
    routes: {
      'main-dashboard': {
        path: '/dashboard',
        title: 'Main Dashboard',
        description: 'Overview of system statistics and activities',
        baseLayout: 'admin-dashboard',
        icon: 'LayoutDashboard'
      }
    }
  },
  settings: {
    title: 'System Settings',
    routes: {
      'general-settings': {
        path: '/settings/general',
        title: 'General Settings',
        description: 'Configure system-wide settings',
        baseLayout: 'admin-dashboard',
        icon: 'Settings',
        parent: '/settings'
      },
      'security-settings': {
        path: '/settings/security',
        title: 'Security Settings',
        description: 'Manage security configurations',
        baseLayout: 'admin-dashboard',
        icon: 'Lock',
        parent: '/settings'
      }
    }
  },
  profile: {
    title: 'Profile Management',
    routes: {
      'my-profile': {
        path: '/profile',
        title: 'My Profile',
        description: 'View and edit your profile',
        baseLayout: 'form',
        icon: 'User'
      },
      'change-password': {
        path: '/profile/change-password',
        title: 'Change Password',
        description: 'Update your password',
        baseLayout: 'form',
        icon: 'Key',
        parent: '/profile'
      }
    }
  }
};
