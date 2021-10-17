import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-gray', class: '' },
    { path: '/categories', title: 'Categorias',  icon:'ni-bullet-list-67 text-gray', class: '' },
    { path: '/new-category', title: 'Nova Categoria',  icon:'ni-bullet-list-67 text-gray', class: '' },
    //{ path: '/tables1', title: 'Listar Receitas',  icon:'ni-bullet-list-67 text-gray', class: '' },
    //{ path: '/tables2', title: 'Listar Despesas',  icon:'ni-bullet-list-67 text-gray', class: '' },
    { path: '/tables', title: 'Premios',  icon:'ni-bullet-list-67 text-gray', class: '' },
    //{ path: '/register', title: 'Register',  icon:'ni-circle-08 text-gray', class: '' },
    { path: '/user-profile', title: 'Meu Perfil',  icon:'ni-single-02 text-gray', class: '' },
    { path: '/login', title: 'Sair',  icon:'ni-user-run text-gray', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[] = [];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}

