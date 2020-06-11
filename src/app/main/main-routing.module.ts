import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CreateBookComponent } from './home-page/create-book/create-book.component';
import { AddReviewComponent } from './home-page/book-details/add-review/add-review.component';
import { BookDetailsComponent } from './home-page/book-details/book-details.component';
import { BookListComponent } from './home-page/book-list/book-list.component';
import { HomePageComponent } from './home-page/home-page.component';
import { createReviewGuard } from '../shared/createReview.guard';
import { MainComponent } from './main.component';
import { DisplayReviewsComponent } from './home-page/book-details/display-reviews/display-reviews.component';
import { CounterPanelComponent } from './counter-panel/counter-panel.component';


const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            // {
            //     path: '',
            //     component: HomePageComponent,
            //     children: [
                    // {
                    //     path: 'booklist',
                    //     component: BookListComponent
                    // },
                    // {
                    //     path: 'details',// create lazy loading
                    //     component: BookDetailsComponent,
                    //     children: [
                    //         {
                    //             path: 'add-review', 
                    //             component: AddReviewComponent, 
                    //             // canActivate: [createReviewGuard]
                    //         },
                    //         {
                    //             path: 'display-review', 
                    //             component: DisplayReviewsComponent, 
                    //             // canActivate: [createReviewGuard]
                    //         }
                    //     ]
                    // },
                    {
                        path: 'home',
                        loadChildren: './home-page/home-page.module#HomePageModule'
                    },
                    {
                        path: 'main', 
                        component: CounterPanelComponent, 
                    }
                    // {
                    //     path: 'new-book', 
                    //     component: CreateBookComponent, 
                    //     // canActivate: [createReviewGuard]
                    // }
                ]
            }
        // ]
    // },
    // {
    //     path: 'register',
    //     component: RegisterComponent
    // }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [createReviewGuard]
  })

export class MainRoutingModule {}