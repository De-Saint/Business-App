import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteGuardService } from "../shared/services/route-guard.service";

import { BusinessesComponent } from './businesses/businesses.component';
import { BusinessprofileComponent } from './businessprofile/businessprofile.component';
import { BusinessstaffComponent } from './businessstaff/businessstaff.component';
import { BusinesspermissionsComponent } from './businesspermissions/businesspermissions.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'businesses',
    pathMatch: 'full'
  },
  {
    path: 'businesses',
    component: BusinessesComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'profile/:id',
    component: BusinessprofileComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'staff/:id',
    component: BusinessstaffComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'permissions/:id',
    component: BusinesspermissionsComponent,
    canActivate: [RouteGuardService]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }
