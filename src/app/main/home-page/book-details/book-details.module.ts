
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes,RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AddReviewComponent } from './add-review/add-review.component';
import { DisplayReviewsComponent } from './display-reviews/display-reviews.component';
import { LoadingSpinnerComponent } from '../../home-page/book-details/shared-BookDetails/loading-spinner/loading-spinner.component';
import { BookDetailsService } from './book-details.service';
import { SharedVariables } from './shared-BookDetails/Shared_variables';
import { Variables } from 'src/app/shared/variables';
import { BookDetailsComponent } from './book-details.component';
import { MainPlaceholderDirective } from '../../share/main_placeholder.directive';
import { BookDetailsRoutingModule } from './book-details-routing.module';
// import { BookDetailsRoutingModule } from './book-details-routing.module';


@NgModule({
  declarations: [
    AddReviewComponent,
    DisplayReviewsComponent,
    BookDetailsComponent,
    // MainPlaceholderDirective,
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BookDetailsRoutingModule,
    NgbModule.forRoot(),
    MatExpansionModule
  ],
  providers: [
    // HomePageService,
    BookDetailsService,
    Variables,
    SharedVariables,
    BsModalService
  ]
})
export class BookDetailsModule { }
