import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewCategoryComponent } from 'src/app/pages/category/new-category/new-category.component';
import { ListCategoriesComponent } from 'src/app/pages/category/list-categories/list-categories.component';
import { ListMovementsComponent } from 'src/app/pages/movement/list-movements/list-movements.component';
import { NewMovementComponent } from 'src/app/pages/movement/new-movement/new-movement.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ChangePasswordComponent } from 'src/app/pages/change-password/change-password.component';
import { MovementTableComponent } from 'src/app/pages/movement/list-movements/movement-table/movement-table.component';
import { MaterialModule } from 'src/app/material.module';
import { InfoCardsComponent } from 'src/app/components/info-cards/info-cards.component';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    MaterialModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    NewCategoryComponent,
    ListCategoriesComponent,
    NewMovementComponent,
    ListMovementsComponent,
    ChangePasswordComponent,
    MovementTableComponent,
    InfoCardsComponent,
  ],
})
export class AdminLayoutModule {}
