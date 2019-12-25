import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookListComponent } from './book-list/book-list.component';
import { CreateReviewComponent } from './create-review/create-review.component';
import { createReviewGuard } from 'src/app/shared/createReview.guard';
// import { createReviewGuard } from 'src/app/shared/createReview.guard';


const routes: Routes = [
    {
        path: 'home',
        component: HomePageComponent,
        children: [
            {path: 'booklist', component: BookListComponent},
            {path: 'details', component: BookDetailsComponent},
            {path: 'new-review', component: CreateReviewComponent, canActivate: [createReviewGuard]}
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [createReviewGuard]
  })
  export class HomePageRoutingModule { }
//   export const HomePageRoutingComponents = []