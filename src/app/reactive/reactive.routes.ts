import { Routes } from '@angular/router';
import { BasicPageComponent } from './pages/basic-page/basic-page.component';
import { DynamicPageComponent } from './pages/dynamic-page/dynamic-page.component';
import { SwitchesPageComponent } from './pages/switches-page/switches-page.component';

export const reactiveRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'basic',
        title: 'Básicos',
        component: BasicPageComponent,
      },
      {
        path: 'dynamic',
        title: 'Dinámicos',
        component: DynamicPageComponent,
      },
      {
        path: 'switches',
        title: 'Interruptores',
        component: SwitchesPageComponent,
      },
      {
        path: '**',
        redirectTo: 'basic',
      },
    ],
  },
];
