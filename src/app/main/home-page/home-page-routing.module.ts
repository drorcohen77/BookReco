import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page.component';
import { BookListComponent } from './book-list/book-list.component';
import { CreateBookComponent } from './create-book/create-book.component';
import { CanDeactivateGuard } from '../share/can-deactivate-guard.service';


const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
        children: [
            {
                path: 'booklist',
                component: BookListComponent
            },
            {
                path: 'details',
                loadChildren: './book-details/book-details.module#BookDetailsModule'
            },
            {
                path: 'new-book', 
                component: CreateBookComponent, 
                canDeactivate: [CanDeactivateGuard]
            }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class HomePageRoutingModule { }