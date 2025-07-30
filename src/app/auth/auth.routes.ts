import { Routes } from '@angular/router';
import { RegisterPageComponent } from '../shared/components/register-page/register-page.component';

export const authRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'sign-up',
        component: RegisterPageComponent,
      },
      {
        path: '**',
        redirectTo: 'sign-up',
      },
    ],
  },
];
export default authRoutes;
