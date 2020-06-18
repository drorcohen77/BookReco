import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Recommendation } from 'src/app/shared/recommendation.model';
import { SharedVariables } from '../shared-BookDetails/Shared_variables';
import { Variables } from 'src/app/shared/variables';
import * as BookReveiwsActions from '../store/book-reviews.actions';


@Component({
  selector: 'app-display-reviews',
  templateUrl: './display-reviews.component.html',
  styleUrls: ['./display-reviews.component.scss']
})
export class DisplayReviewsComponent implements OnInit, OnDestroy {

  @Input() bookID: string;

  public BookReviews: Recommendation[] = [];
  private subscription: Subscription; 

  constructor(private sharedVaribles: SharedVariables,
              private variables: Variables,
              private store: Store<{ bookReviews }>
              ) {}


  ngOnInit() {

    this.subscription = this.store
          .select('bookReviews')
          .subscribe(
            (reviews: any)=> {
              this.variables.LoadSpiner = reviews.loadSpiner;
              this.sharedVaribles.reviewButton = reviews.closeReviews;
              this.BookReviews = reviews.bookReviews;
            }
          );      
  }
  


  close() {
    this.store.dispatch(
      new BookReveiwsActions.closeReviewsDisplay()
    );
  }

  
  ngOnDestroy():  void {
    this.sharedVaribles.reviewButton = false;
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
