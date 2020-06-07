import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { StoreModule, Store } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { MainModule } from './main/main.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { environment } from '../environments/environment';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoadSpinnerComponent } from './shared/load-spinner/load-spinner.component';
import { AppPlaceholderDirective } from './shared/app_placeholder.directive';
import { AuthReducer } from './auth/store/auth.reducer';
import { from } from 'rxjs';
import { BookListReducer } from './main/home-page/store/book-list.reducer';
import { BookReviewsReducer } from './main/home-page/book-details/store/book-reviews.reducer';

//import { HeaderService } from './common/header/header.service';//check
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth-Interceptor.service';
// import * as fromApp from './store/app.reducer';



@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    LoadSpinnerComponent,
    AppPlaceholderDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MainModule,
    StoreModule.forRoot({auth: AuthReducer,bookList: BookListReducer, bookReviews: BookReviewsReducer}),
    StoreDevtoolsModule.instrument({logOnly: environment.production}),
    StoreDevtoolsModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BsDatepickerModule.forRoot(),
    MatExpansionModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    HttpClientModule,
  ],
  //providers: [],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
  // entryComponents: [
  //   LoginComponent
  // ]
})
export class AppModule { }
