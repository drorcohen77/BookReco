import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { StoreModule, Store } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainModule } from './main/main.module';
import { BookListReducer } from './main/home-page/store/book-list.reducer';
import { BookReviewsReducer } from './main/home-page/book-details/store/book-reviews.reducer';
import { HeaderComponent } from './common/header/header.component';
import { environment } from '../environments/environment';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthReducer } from './auth/store/auth.reducer';
import { AuthEffects } from './auth/store/auth.effects';
import { AuthInterceptor } from './auth/auth-Interceptor.service';
import { LoadSpinnerComponent } from './shared/load-spinner/load-spinner.component';
import { AppPlaceholderDirective } from './shared/app_placeholder.directive';
import { BookReviewsEffects } from './main/home-page/book-details/store/book-reviews.effects';
import { BookListEffects } from './main/home-page/store/book-list.effects';
import { Variables } from './shared/variables';
import { SharedVariables } from './main/home-page/book-details/shared-BookDetails/Shared_variables';
// import { BookDetailsModule } from './main/home-page/book-details/book-details.module';
// import { from } from 'rxjs';

//import { HeaderService } from './common/header/header.service';//check
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
    // MainModule,
    // BookDetailsModule,
    StoreModule.forRoot({auth: AuthReducer, bookList: BookListReducer, bookReviews: BookReviewsReducer}),
    EffectsModule.forRoot([AuthEffects,BookListEffects,BookReviewsEffects]),
    // EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({logOnly: environment.production}),
    // StoreDevtoolsModule,
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
  providers: [
    Variables,
    SharedVariables,{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginComponent
  ]
})
export class AppModule { }
