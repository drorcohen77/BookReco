
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes,RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MainComponent } from './main.component';
import { BookReviewsEffects } from '../main/home-page/book-details/store/book-reviews.effects'
// import { HomePageRoutingModule } from './home-page/home-page-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { BookListComponent } from './home-page/book-list/book-list.component';
import { BookDetailsComponent } from './home-page/book-details/book-details.component';
import { AddReviewComponent } from './home-page/book-details/add-review/add-review.component';
import { DisplayReviewsComponent } from './home-page/book-details/display-reviews/display-reviews.component';
import { HomePageService } from './home-page/home-page.service';
import { BookDetailsService } from './home-page/book-details/book-details.service';
import { SharedVariables } from './home-page/book-details/shared-BookDetails/Shared_variables';
import { CreateBookComponent } from './home-page/create-book/create-book.component';
import { BookListEffects } from './home-page/store/book-list.effects';
import { BookReviewsReducer } from './home-page/book-details/store/book-reviews.reducer'
//import { CreateReviewModalComponent } from './home-page/create-book/create-review-modal/create-review-modal.component';

import { Variables } from '../shared/variables';
import { MainPlaceholderDirective } from './share/main_placeholder.directive';
import { LoadingSpinnerComponent } from './share/loading-spinner/loading-spinner.component';

import { BookListReducer } from '../main/home-page/store/book-list.reducer';
import { CounterPanelComponent } from './counter-panel/counter-panel.component';
import { BookTitlePipe } from '../common/pipes/book-title.pipe';
import { LoginComponent } from '../auth/login/login.component';
import { MainRoutingModule } from './main-routing.module';
import { HomePageModule } from './home-page/home-page.module';
// import { AuthInterceptor } from '../auth/auth-Interceptor.service';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { HeaderService } from '../store/header.service';//check
// import * as fromMain from '../store/app.reducer';


// const routes: Routes = [ 
//   {
//     path: '',
//     component: MainComponent,
//     children: [
//       {path: 'home/booklist' , component: HomePageComponent}
//     ]
//   }
// ];

@NgModule({
  declarations: [
    MainComponent,
    // HomePageComponent,
    CounterPanelComponent,
    // BookTitlePipe,
    // BookListComponent,
    // BookDetailsComponent,
    // AddReviewComponent,
    // DisplayReviewsComponent,
    // CreateBookComponent,
    //CreateReviewModalComponent,
    // MainPlaceholderDirective,
    // LoadingSpinnerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    // HomePageModule,
    MainRoutingModule,
    // HttpClientModule,
    // StoreModule.forRoot({
    //   // bookList: BookListReducer,
    //   bookReviews: BookReviewsReducer
    // }),
    // StoreModule.forRoot(fromApp.appReducer.homepage),
    // EffectsModule.forRoot([BookListEffects,BookReviewsEffects]),
    NgbModule.forRoot(),
    // BsDatepickerModule.forRoot(),
    // MatExpansionModule,
    // RouterModule.forRoot(routes)
  ],
  providers: [
    // HomePageService,
    // BookDetailsService,
    Variables,
    SharedVariables,
    // BsModalService,
    // {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  // providers: [HeaderService,HomePageService,BookDetailsService,Variables,SharedVariables,BsModalService],
  // providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  // entryComponents: [
  //   LoginComponent// to arise the login modal 
  // ]

})
export class MainModule { }
