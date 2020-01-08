import { Router, ActivatedRoute } from '@angular/router';
import { Recommendation } from 'src/app/shared/recommendation.model';
import { HomePageService } from './../home-page.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment'
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';



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
  

  constructor(private HomePageService: HomePageService, private nav: Router, private route: ActivatedRoute, private toastr: ToastrService) {

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

    this.createReview.title = this.createReview.title.replace(/[^\w\s]/gi, "")
                                                        .trim()
                                                        .replace(/\b\w/g, (s) => s.toUpperCase());
    this.newReview = {...this.createReview, createDate: this.nowDate};
    // const startAtSearch: string = this.createReview.title.slice(0,3);
    // const endAtSearch: string = this.createReview.title.slice(this.createReview.title.length-3);
    // addReview.reset();
    if (!localStorage.getItem('new_book')) {
        this.checkBook = await this.HomePageService.existBook(this.createReview.title);
    }
    console.log(this.checkBook,this.bookID)
    if (this.bookID != undefined && this.HomePageService.Exist_Book) {
        this.addingReview(this.bookID,this.newReview);
    } else if (this.bookID != undefined) {
        this.addingReview(this.bookID,this.newReview);
    } else if (this.checkBook != undefined) {
      this.addingReview(this.checkBook,this.newReview);
    } else {
        localStorage.setItem('new_review', JSON.stringify(this.newReview));
        this.toastr.warning('The Book You Enterd Has No Match In Our Stored Books. Please Create New Book For That Name.');
        this.nav.navigate(['home/new-book']);
    }
    localStorage.removeItem('new_book');
  }


  private addingReview(bookId: string, review:Recommendation): void {

    this.HomePageService.addRecommendation(bookId,review);
    this.toastr.success('Your Review Has Been Successfuly Added!');
    this.nav.navigate(['/home/booklist']);
  }

}
