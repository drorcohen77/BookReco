import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';

import { HomePageComponent } from './home-page.component';
import { BookTitlePipe } from 'src/app/common/pipes/book-title.pipe';
import { BookListComponent } from './book-list/book-list.component';
import { CreateBookComponent } from './create-book/create-book.component';
import { MainPlaceholderDirective } from '../share/main_placeholder.directive';
import { LoadingSpinnerComponent } from '../share/loading-spinner/loading-spinner.component';
import { HomePageService } from './home-page.service';
import { BookDetailsService } from './book-details/book-details.service';
import { Variables } from 'src/app/shared/variables';
import { SharedVariables } from './book-details/shared-BookDetails/Shared_variables';
import { HomePageRoutingModule } from './home-page-routing.module'

@NgModule({
    declarations: [
      HomePageComponent,
      BookTitlePipe,
      BookListComponent,
      CreateBookComponent,
      MainPlaceholderDirective,
      LoadingSpinnerComponent
    ],
    imports: [
      CommonModule,
      FormsModule,
      HomePageRoutingModule,
      BsDatepickerModule.forRoot(),
      MatExpansionModule
    ],
    providers: [
      HomePageService,
      BookDetailsService,
      Variables,
      SharedVariables,
      BsModalService
    ]
  })
  export class HomePageModule { }