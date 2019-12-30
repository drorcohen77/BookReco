import { Router } from '@angular/router';
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
  private nowDate: string;
  private checkBook: any;
  private newReview: any; 
  // private bookExists: boolean;

  constructor(private HomePageService: HomePageService, private nav: Router) {
    this.createReview = new Recommendation();
    this.nowDate = moment().format('DD/MM/YYYY');
  }

  ngOnInit() {}


  async onCreateReveiw(addReview: NgForm) {
    this.createReview.title = this.createReview.title.replace(/[^\w\s]/gi, "").trim().replace(/\b\w/g, (s) => s.toUpperCase());
    this.newReview = {...this.createReview, createDate: this.nowDate, title: this.createReview.title};
    console.log(this.newReview)
    // const startAtSearch: string = this.createReview.title.slice(0,3);
    // const endAtSearch: string = this.createReview.title.slice(this.createReview.title.length-3);
    addReview.reset();

    // this.HomePageService.existBook(this.newReview.title).subscribe(
    //   (bookExists: string) => {
    //     this.checkBook = bookExists;
    //     console.log(this.checkBook)
    //     debugger
    //   }
    // );

    this.checkBook = await this.HomePageService.existBook(this.newReview.title);
    debugger
        console.log(this.checkBook,'good')

    if(this.checkBook != undefined) {
      delete this.newReview.title;
      this.HomePageService.addRecommendation(this.checkBook,this.newReview);
      this.nav.navigate(['/home/booklist']);
    }else{
      this.nav.navigate(['home/new-book']);
    }
  }


}
