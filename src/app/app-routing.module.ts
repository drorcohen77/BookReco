
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './main/home-page/home-page.component';
import { RegisterComponent } from './auth/register/register.component';


const routes: Routes = [
  { path: '',
    // redirectTo: 'home/booklist',
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = []