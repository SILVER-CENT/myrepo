"use client"

import { useRouter, usePathname } from 'next/navigation';
import { routes, getBaseLayoutFromPath, getRouteByPath } from './routes';
import type { BaseLayout, NavigationState } from './types';
import { useEffect, useState } from 'react';

export function useNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [state, setState] = useState<NavigationState>({
    currentPath: pathname,
    baseLayout: getBaseLayoutFromPath(pathname),
    parentPath: getRouteByPath(pathname)?.parent
  });

  useEffect(() => {
    setState({
      currentPath: pathname,
      baseLayout: getBaseLayoutFromPath(pathname),
      parentPath: getRouteByPath(pathname)?.parent
    });
  }, [pathname]);

  const navigate = (path: string) => {
    router.push(path);
  };

  return {
    navigate,
    getCurrentState: () => state,
    getBaseLayout: () => state.baseLayout,
    routes,
  };
}