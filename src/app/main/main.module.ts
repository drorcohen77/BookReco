
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Routes,RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HomePageRoutingModule } from './home-page/home-page-routing.module';

import { MainComponent } from './main.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CounterPanelComponent } from './counter-panel/counter-panel.component';
import { BookListComponent } from './home-page/book-list/book-list.component';
import { BookDetailsComponent } from './home-page/book-details/book-details.component';
import { CreateReviewComponent } from './home-page/create-review/create-review.component';
import { AddReviewComponent } from './home-page/book-details/add-review/add-review.component';
import { DisplayReviewsComponent } from './home-page/book-details/display-reviews/display-reviews.component';

import { HomePageService } from './home-page/home-page.service';
import { BookDetailsService } from './home-page/book-details/book-details.service';

import { Variables } from '../shared/variables';
import { SharedVariables } from './home-page/book-details/shared-BookDetails/Shared_variables';
import { CreateBookComponent } from './home-page/create-book/create-book.component';






const routes: Routes = [ 
  {
    path: '',
    component: MainComponent,
    children: [
      {path: 'home/booklist' , component: HomePageComponent}
    ]
  }
];

@NgModule({
  declarations: [
    MainComponent,
    HomePageComponent,
    CounterPanelComponent,
    BookListComponent,
    BookDetailsComponent,
    CreateReviewComponent,
    AddReviewComponent,
    DisplayReviewsComponent,
    CreateBookComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomePageRoutingModule,
    HttpClientModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [HomePageService,BookDetailsService,Variables,SharedVariables]
})
export class MainModule { }
