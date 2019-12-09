import { Recommendation } from 'src/app/shared/recommendation.model';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Books } from 'src/app/shared/books.model';
import { SharedVariables } from '../shared-variables/shared_variables';
import * as moment from 'moment'
import { BookDetailsService } from '../book-details.service';



@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss']
})
export class AddReviewComponent implements OnInit,OnDestroy {

  @Input() Book: Books;
  public newReview:Recommendation;
  public nowDate: string;
  private readonly _ID: string = '+RATE';
  

  constructor(private sharedVaribles: SharedVariables, private bookDetailsService: BookDetailsService) { }

  ngOnInit() {
    this.newReview = new Recommendation();
    this.nowDate = moment().format('DD/MM/YYYY');
    this.newReview = {...this.newReview, createDate: this.nowDate};
    console.log(this.newReview.createDate)
  }

  // this.dataStore.push(...data.Search.map( ({Type,...rest}) => ({...rest,Favorite: false}) ) );
  public addReveiw() {

    firebase.app('BookReco').database().ref('review').child("users").orderByChild("_bookID").equalTo(this.Book._bookID).once("value", snapshot => {
      if (snapshot.exists()){
         console.log("exists!");
         // TODO: Handle that users do exist
         return true;
      }
   
      // TODO: Handle that users do not exist
   });

    this.sharedVaribles.bookReviews = new Books();
    this.newReview = {...this.newReview, _reviewID: this.Book._bookID + this._ID}
    this.sharedVaribles.bookReviews = {...this.Book,...this.sharedVaribles.bookReviews};
    console.log(this.Book)
    console.log(this.newReview)
    debugger
    this.sharedVaribles.bookReviews.recommendation.push(this.newReview);
    debugger
    // let x = JSON.parse(this.sharedVaribles.bookReviews)
    console.log(this.sharedVaribles.bookReviews)

    // this.bookDetailsService.addReview(this.bookReviews);

    this.sharedVaribles.addRevieButton = false;
  }


  ngOnDestroy(): void {
    this.sharedVaribles.addRevieButton = false;
  }

}
