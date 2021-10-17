import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
//import { Tables1Component } from 'src/app/pages/tables copy/tables1.component';
//import { Tables2Component } from 'src/app/pages/tables copy 2/tables2.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    //{path: 'tables1',         component: Tables1Component },
    //{ path: 'tables2',         component: Tables2Component },
];
