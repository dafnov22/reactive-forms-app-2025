import { Component } from '@angular/core';
import { reactiveRoutes } from '../../../reactive/reactive.routes';
import { RouterLink } from '@angular/router';

interface MenuItem {
  title: string;
  route: string;
}

const reactiveItems = reactiveRoutes[0].children ?? [];

@Component({
  selector: 'app-side-menu',
  imports: [RouterLink],
  templateUrl: './side-menu.component.html',
  styles: ``,
})
export class SideMenuComponent {
  reactiveMenu: MenuItem[] = reactiveItems
    .filter((item) => item.path !== '**')
    .map((item) => ({
      title: `${item.title}`,
      route: `reactive/${item.path}`,
    }));

  authMenu: MenuItem[] = [
    {
      title: 'Registro',
      route: './auth',
    },
  ];
  countryMenu: MenuItem[] = [
    {
      title: 'Países',
      route: './country',
    },
  ];
}
