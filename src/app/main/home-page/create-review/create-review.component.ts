import { Recommendation } from 'src/app/shared/recommendation.model';
import { HomePageService } from './../home-page.service';
import { Component, OnInit } from '@angular/core';
import { Books } from 'src/app/shared/books.model';
import * as moment from 'moment'
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.scss']
})
export class CreateReviewComponent implements OnInit {

 
  // public pickedBook: Books;
  public createReview: any;
  private nowDate: string;
  private checkBook: boolean;
  private newReview: any; 
  // private bookExists: boolean;

  constructor(private HomePageService: HomePageService) {
    this.createReview = new Recommendation();
    this.nowDate = moment().format('DD/MM/YYYY');
  }

  ngOnInit() {}


  onCreateReveiw(addReview: NgForm) {
    this.createReview.title = this.createReview.title.replace(/[^\w\s]/gi, "").trim().replace(/\b\w/g, (s) => s.toUpperCase());
    this.newReview = {...this.createReview, createDate: this.nowDate, title: this.createReview.title};

    // const startAtSearch: string = this.createReview.title.slice(0,3);
    // const endAtSearch: string = this.createReview.title.slice(this.createReview.title.length-3);
    
    this.HomePageService.existBook(this.newReview)
    .subscribe(
      (bookExists: boolean) => {
        this.checkBook = bookExists;
        console.log(this.checkBook)
      }
    );

    addReview.reset();
  }


  

}
