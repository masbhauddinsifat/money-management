import { Page404Component } from './../@auth/page404/page404.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../@module/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'authentication',
    loadChildren: () =>
      import('../@auth/auth.module').then((m) => m.AuthModule),
    canActivate: [],
  },
  {
    path: '**',
    component: Page404Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
