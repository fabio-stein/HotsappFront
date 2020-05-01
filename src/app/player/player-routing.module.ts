import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExternalPlayerComponent } from './external-player/external-player.component';
import { AppPlayerComponent } from './app-player/app-player.component';
import { NbAuthComponent } from '@nebular/auth';

const routes: Routes = [
  {
    path: 'dev',
    component: AppPlayerComponent
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: ExternalPlayerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerRoutingModule { }
