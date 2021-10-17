import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NewCategoryComponent } from 'src/app/pages/category/new-category/new-category.component';
import { ListCategoriesComponent } from 'src/app/pages/category/list-categories/list-categories.component';
import { NewMovementComponent } from 'src/app/pages/movement/new-movement/new-movement.component';
import { ListMovementsComponent } from 'src/app/pages/movement/list-movements/list-movements.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'new-category',         component: NewCategoryComponent },
    { path: 'categories',         component: ListCategoriesComponent },
    { path: 'new-movement',         component: NewMovementComponent },
    { path: 'movements',         component: ListMovementsComponent },
];
