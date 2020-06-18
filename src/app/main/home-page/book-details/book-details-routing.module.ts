import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

import { DisplayReviewsComponent } from './display-reviews/display-reviews.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { BookDetailsComponent } from './book-details.component';


const routes: Routes = [
    {
        path: '',
        component: BookDetailsComponent,
        children: [
            {
                path: 'add-review', 
                component: AddReviewComponent
            },
            {
                path: 'display-review', 
                component: DisplayReviewsComponent
            }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class BookDetailsRoutingModule { }