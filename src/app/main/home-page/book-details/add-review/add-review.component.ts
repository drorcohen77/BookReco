import { Variables } from './../../../../shared/variables';
import { Recommendation } from 'src/app/shared/recommendation.model';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Books } from 'src/app/shared/books.model';
import * as moment from 'moment'
import { BookDetailsService } from '../book-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedVariables } from '../shared-BookDetails/Shared_variables';



@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss']
})
export class AddReviewComponent implements OnInit,OnDestroy {

  @Input() Book: Books;
  public newReview:Recommendation;
  private nowDate: string;
  // private readonly _ID: string = '+RATE';
  

  constructor(private sharedVaribles: SharedVariables,
              private bookDetailsService: BookDetailsService,
              private route: ActivatedRoute,
              private nav: Router,
              private variables: Variables) {

    this.sharedVaribles.bookID = this.route.snapshot.queryParams['book-id'];
   }

  ngOnInit() {
    
    this.newReview = new Recommendation();
    this.nowDate = moment().format('DD/MM/YYYY');
    this.newReview = {...this.newReview, createDate: this.nowDate};
    console.log(this.newReview.createDate,this.sharedVaribles.bookID)
  }

  // this.dataStore.push(...data.Search.map( ({Type,...rest}) => ({...rest,Favorite: false}) ) );
  public addReveiw() {
    debugger
    // firebase.app('BooksReco').database().ref('review').child("LvbO3J2zlP-O5RPLFf").equalTo(this.Book._bookID).once("value", snapshot => {
    //   if (snapshot.exists()){
    //      console.log("exists!");
         // TODO: Handle that users do exist
      //    return true;
      // }
   
      // TODO: Handle that users do not exist
  //  });
  // this.variables.logedIn= true
    if(this.variables.logedIn) {
      debugger
      this.sharedVaribles.bookReviews = new Books();
      // this.newReview = {...this.newReview, _reviewID: this.Book._bookID + this._ID}
      this.newReview = {...this.newReview, _reviewID: this.Book._bookID}
      this.sharedVaribles.bookReviews = {...this.Book,...this.sharedVaribles.bookReviews};
      console.log(this.Book)
      console.log(this.newReview)
      
      // this.sharedVaribles.bookReviews.recommendation.push(this.newReview);
      this.sharedVaribles.bookReviews.recommendation = this.newReview;
      
      // let x = JSON.parse(this.sharedVaribles.bookReviews)
      console.log(this.sharedVaribles.bookReviews)
      console.log(this.sharedVaribles.existBookID)
      this.bookDetailsService.addReview(this.sharedVaribles.bookReviews.recommendation);

      this.sharedVaribles.addRevieButton = false;
    } else {
        this.nav.navigate(['/login']);
    }
  }


  ngOnDestroy(): void {
    this.sharedVaribles.addRevieButton = false;
  }

}
