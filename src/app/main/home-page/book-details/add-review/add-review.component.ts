import { Variables } from './../../../../shared/variables';
import { Recommendation } from 'src/app/shared/recommendation.model';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Books } from 'src/app/shared/books.model';
import * as moment from 'moment'
import { BookDetailsService } from '../book-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedVariables } from '../shared-BookDetails/Shared_variables';
import { ToastrService } from 'ngx-toastr';



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
              private variables: Variables,
              private toastr: ToastrService) {

    this.sharedVaribles.bookID = this.route.snapshot.queryParams['book-id'];
   }

  ngOnInit() {
    
    this.newReview = new Recommendation();
    this.nowDate = moment().format('DD/MM/YYYY');
    this.newReview = {...this.newReview, createDate: this.nowDate};
    console.log(this.newReview.createDate,this.sharedVaribles.bookID)
  }

  
  public addReveiw() {

    if(this.variables.logedIn) {

      this.sharedVaribles.bookReviews = new Books();
      this.sharedVaribles.bookReviews = {...this.Book,...this.sharedVaribles.bookReviews};
      console.log(this.Book)
      console.log(this.newReview)
   
      this.sharedVaribles.bookReviews.recommendation = this.newReview;
      
      console.log(this.sharedVaribles.bookReviews)
      console.log(this.sharedVaribles.existBookID)
      this.bookDetailsService.addReview(this.sharedVaribles.bookReviews.recommendation);
      this.toastr.success('Your Review Has Been Successfuly Added!');
      this.sharedVaribles.addRevieButton = false;
    } else {
        this.nav.navigate(['/login']);
    }
  }


  ngOnDestroy(): void {
    this.sharedVaribles.addRevieButton = false;
  }

}
