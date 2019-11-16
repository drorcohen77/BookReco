
import { NgModule } from '@angular/core';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
// import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { HomePageComponent } from './home-page/home-page.component';



// const routes: Routes = [ 
//   {
//     path: '',
//     redirectTo: 'home',
//     pathMatch: 'full'
//   }
// ];

@NgModule({
  declarations: [
    MainComponent,
    HomePageComponent
  ],
  imports: [
    FormsModule,
    // NgbModule.forRoot(),
    // RouterModule.forChild(routes)
  ],
  providers: []
})
export class MainModule { }
