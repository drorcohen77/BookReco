
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { RegisterComponent } from './auth/register/register.component';


const routes: Routes = [
  { path: '',
    redirectTo: 'main',
    pathMatch:'full'
  },
  {
    path: 'main',
    loadChildren: './main/main.module#MainModule'
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules } )],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponents = []