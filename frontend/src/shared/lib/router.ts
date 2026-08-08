import { useSyncExternalStore } from 'react';

export const ROUTES = {
  landing: '/',
  success: '/success',
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];

function subscribe(callback: () => void): () => void {
  window.addEventListener('popstate', callback);
  return () => window.removeEventListener('popstate', callback);
}

function getSnapshot(): string {
  return window.location.pathname;
}

export function usePathname(): string {
  return useSyncExternalStore(subscribe, getSnapshot);
}

export function navigate(path: AppRoute): void {
  if (window.location.pathname === path) {
    return;
  }

  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo(0, 0);
}
