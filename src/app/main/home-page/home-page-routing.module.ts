import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookListComponent } from './book-list/book-list.component';
import { CreateReviewComponent } from './create-review/create-review.component';


const routes: Routes = [
    {
        path: 'home',
        component: HomePageComponent,
        children: [
            {path: 'booklist', component: BookListComponent},
            {path: 'details', component: BookDetailsComponent},
            {path: 'new-review', component: CreateReviewComponent}
        ]
    }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class HomePageRoutingModule { }
  export const HomePageRoutingComponents = []