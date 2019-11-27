import { NgModule } from '@angular/core';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Routes,RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';



const routes: Routes = [ 
    {path: 'login' , component: LoginComponent},
    {path: 'register' , component: RegisterComponent}
];

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    FormsModule,
    // NgbModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  providers: []
})
export class AuthModule { }