
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';

import { AddReviewComponent } from './add-review/add-review.component';
import { DisplayReviewsComponent } from './display-reviews/display-reviews.component';
import { LoadingSpinnerComponent } from '../../home-page/book-details/shared-BookDetails/loading-spinner/loading-spinner.component';
import { BookDetailsService } from './book-details.service';
import { SharedVariables } from './shared-BookDetails/Shared_variables';
import { Variables } from 'src/app/shared/variables';
import { BookDetailsComponent } from './book-details.component';
import { BookDetailsRoutingModule } from './book-details-routing.module';
import { BookDetailsPlaceholderDirective } from './shared-BookDetails/book-details-placeholder.directive';


@NgModule({
  declarations: [
    AddReviewComponent,
    DisplayReviewsComponent,
    BookDetailsComponent,
    BookDetailsPlaceholderDirective,
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
    BookDetailsService,
    Variables,
    SharedVariables,
    BsModalService
  ]
})
export class BookDetailsModule { }
