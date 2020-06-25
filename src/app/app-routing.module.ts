import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'pages',
    loadChildren: 'app/pages/pages.module#PagesModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: 'app/auth/auth.module#AuthModule',
  },
  {
    path: 'player',
    loadChildren: 'app/player/player.module#PlayerModule'
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: false,
  paramsInheritanceStrategy: 'always'
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
