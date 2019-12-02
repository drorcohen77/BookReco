import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { AddReviewComponent } from './add-review/add-review.component';
import { DisplayReviewsComponent } from './display-reviews/display-reviews.component';


const routes: Routes = [
    
    {path: 'add-review', component: AddReviewComponent},
    {path: 'display', component: DisplayReviewsComponent}
      
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class BookDetailsRoutingModule { }