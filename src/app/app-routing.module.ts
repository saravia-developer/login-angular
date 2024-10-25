import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'r',
    loadChildren: () => import('./core/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    canActivate: [authGuard]
  },
  {
    path: 'table',
    loadChildren: () => import('./modules/table/table.module').then(m => m.TableModule),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '/r/login',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
