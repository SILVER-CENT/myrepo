import { RouteTree, BaseLayout } from './types';
import {
  Users,
  UserPlus,
  Shield,
  ShieldPlus,
  List,
  FormInput
} from 'lucide-react';

export const routes: RouteTree = {
  user: {
    title: 'User Management',
    routes: {
      'user-entry': {
        path: '/user/entry',
        title: 'User Entry',
        description: 'Create or edit user information',
        baseLayout: 'form',
        icon: 'UserPlus',
        parent: '/user'
      },
      'user-list': {
        path: '/user/list',
        title: 'User List',
        description: 'View and manage users',
        baseLayout: 'data-view',
        icon: 'Users',
        parent: '/user'
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
        parent: '/role'
      },
      'role-list': {
        path: '/role/list',
        title: 'Role List',
        description: 'View and manage roles',
        baseLayout: 'data-view',
        icon: 'Shield',
        parent: '/role'
      }
    }
  }
};

export const getBaseLayoutFromPath = (path: string): BaseLayout | undefined => {
  for (const group of Object.values(routes)) {
    for (const route of Object.values(group.routes)) {
      if (route.path === path) {
        return route.baseLayout;
      }
    }
  }
  return undefined;
};

export const getRouteByPath = (path: string) => {
  for (const group of Object.values(routes)) {
    for (const route of Object.values(group.routes)) {
      if (route.path === path) {
        return route;
      }
    }
  }
  return undefined;
};

export const getParentRoute = (path: string) => {
  const route = getRouteByPath(path);
  if (route?.parent) {
    return getRouteByPath(route.parent);
  }
  return undefined;
};