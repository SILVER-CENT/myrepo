import { RouteTree } from './types'

export const secureRoutes: RouteTree = {
  user: {
    title: 'User Management',
    routes: {
      'user-entry': {
        path: '/user/entry',
        title: 'User Entry',
        description: 'Create or edit user information',
        baseLayout: 'form',
        icon: 'UserPlus',
        parent: '/user',
        guard: {
          requireAuth: true,
          allowedRoles: ['admin', 'maker'],
          requireMakerChecker: true,
          makerRoles: ['maker'],
          checkerRoles: ['checker']
        }
      },
      'user-list': {
        path: '/user/list',
        title: 'User List',
        description: 'View and manage users',
        baseLayout: 'data-view',
        icon: 'Users',
        parent: '/user',
        guard: {
          requireAuth: true,
          allowedRoles: ['admin', 'maker', 'checker', 'viewer']
        }
      }
    }
  },
  role: {
    title: 'Role Management',
    routes: {
      'role-entry': {
        path: '/role/entry',
        title: 'Role Entry',
        description: 'Create or edit role information',
        baseLayout: 'form',
        icon: 'ShieldPlus',
        parent: '/role',
        guard: {
          requireAuth: true,
          allowedRoles: ['admin'],
          requireMakerChecker: true,
          makerRoles: ['admin'],
          checkerRoles: ['admin']
        }
      },
      'role-list': {
        path: '/role/list',
        title: 'Role List',
        description: 'View and manage roles',
        baseLayout: 'data-view',
        icon: 'Shield',
        parent: '/role',
        guard: {
          requireAuth: true,
          allowedRoles: ['admin', 'viewer']
        }
      }
    }
  }
}