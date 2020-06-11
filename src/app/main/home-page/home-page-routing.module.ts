// import { NgModule } from '@angular/core';
// import { Routes,RouterModule } from '@angular/router';

// import { HomePageComponent } from './home-page.component';
// import { BookDetailsComponent } from './book-details/book-details.component';
// import { BookListComponent } from './book-list/book-list.component';
// // import { CreateReviewComponent } from './create-review-modal/create-review-modal.component';
// import { CreateBookComponent } from './create-book/create-book.component';
// import { createReviewGuard } from 'src/app/shared/createReview.guard';
// import { AddReviewComponent } from './book-details/add-review/add-review.component';
// import { RegisterComponent } from 'src/app/auth/register/register.component';
// import { DisplayReviewsComponent } from './book-details/display-reviews/display-reviews.component';


// const routes: Routes = [
//     {
//         path: '',
//         component: HomePageComponent,
//         children: [
//             {
//                 path: 'booklist',
//                 component: BookListComponent},
//             {
//                 path: 'details',
//                 component: BookDetailsComponent,
//                 children: [
//                     {
//                         path: 'add-review', 
//                         component: AddReviewComponent, 
//                         // canActivate: [createReviewGuard]
//                     },
//                     {
//                         path: 'display-review', 
//                         component: DisplayReviewsComponent, 
//                         // canActivate: [createReviewGuard]
//                     }
//                 ]
//             },
//             // {
//             //     path: 'new-review', 
//             //     component: CreateReviewComponent, 
//             //     canActivate: [createReviewGuard]
//             // },
//             {
//                 path: 'new-book', 
//                 component: CreateBookComponent, 
//                 // canActivate: [createReviewGuard]
//             }
//         ]
//     },
//     // {
//     //     path: 'register',
//     //     component: RegisterComponent
//     // }
// ];


// @NgModule({
//     imports: [RouterModule.forChild(routes)],
//     exports: [RouterModule],
//     providers: [createReviewGuard]
//   })
//   export class HomePageRoutingModule { }
// //   export const HomePageRoutingComponents = []