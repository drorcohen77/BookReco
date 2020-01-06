import { Router, ActivatedRoute } from '@angular/router';
import { Recommendation } from 'src/app/shared/recommendation.model';
import { HomePageService } from './../home-page.service';
import { Component, OnInit } from '@angular/core';
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
  public bookID: any;
  private nowDate: string;
  private checkBook: any;
  private newReview: any; 
  // private bookExists: boolean;

  constructor(private HomePageService: HomePageService, private nav: Router, private route: ActivatedRoute) {

    this.bookID = this.route.snapshot.queryParams['book_id'];
    this.createReview = new Recommendation();
    this.nowDate = moment().format('DD/MM/YYYY');
  }

  ngOnInit() {}


  async onCreateReveiw(addReview: NgForm) {
    
    if (localStorage.getItem('new_book')) {
      let newBook = JSON.parse(localStorage.getItem('new_book'));
      this.createReview.title = newBook.title;
    }
    console.log(this.createReview)
    this.createReview.title = this.createReview.title.replace(/[^\w\s]/gi, "")
                                                        .trim()
                                                        .replace(/\b\w/g, (s) => s.toUpperCase());
    this.newReview = {...this.createReview, createDate: this.nowDate};
    console.log(this.newReview)
    // const startAtSearch: string = this.createReview.title.slice(0,3);
    // const endAtSearch: string = this.createReview.title.slice(this.createReview.title.length-3);
    // addReview.reset();
    if (!localStorage.getItem('new_book')) {
        this.checkBook = await this.HomePageService.existBook(this.createReview.title);
    }

    if (this.bookID && this.bookID !== 'false') {
        this.HomePageService.addRecommendation(this.bookID,this.newReview);
        this.nav.navigate(['/home/booklist']);
    } else if (this.checkBook != undefined || this.bookID === 'false') {
        delete this.newReview.title;
        this.HomePageService.addRecommendation(this.checkBook,this.newReview);
        this.nav.navigate(['/home/booklist']);
    } else {
        localStorage.setItem('new_review', JSON.stringify(this.newReview));
        // if (localStorage.getItem('new_book')) {

        // } else {
          this.nav.navigate(['home/new-book']);
        // }
    }
    
    localStorage.removeItem('new_book');
  }

}
