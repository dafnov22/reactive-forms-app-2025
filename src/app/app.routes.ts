import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'reactive',
    // Lazy loading the ReactiveComponent
    loadChildren: () =>
      import('./reactive/reactive.routes').then((m) => m.reactiveRoutes),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
  },
  {
    path: 'country',
    loadChildren: () =>
      import('./country/country.routes').then((m) => m.countryRoutes),
  },
  {
    path: '**',
    redirectTo: 'reactive',
  },
];
