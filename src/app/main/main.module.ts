
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Routes,RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CounterPanelComponent } from './counter-panel/counter-panel.component';
import { BookListComponent } from './home-page/book-list/book-list.component';
import { BookDetailsComponent } from './home-page/book-details/book-details.component';
import { CreateReviewComponent } from './home-page/create-review/create-review.component';
import { HomePageRoutingModule } from './home-page/home-page-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HomePageService } from './home-page/home-page.service';
import { Variables } from '../shared/variables';
import { AddReviewComponent } from './home-page/book-details/add-review/add-review.component';
import { DisplayReviewsComponent } from './home-page/book-details/display-reviews/display-reviews.component';
import { BookDetailsRoutingModule } from './home-page/book-details/book-details-routing.module';





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
    DisplayReviewsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomePageRoutingModule,
    // HomePageRoutingComponents,
    BookDetailsRoutingModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(routes)
  ],
  providers: [HomePageService,Variables]
})
export class MainModule { }
