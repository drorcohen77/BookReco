import { Component, OnInit } from '@angular/core';
import { Recommendation } from 'src/app/shared/recommendation';


@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.sass']
})
export class AddReviewComponent implements OnInit {

  public newReview = new Recommendation;

  constructor() { }

  ngOnInit() {
  }


  public addReveiw() {
    
    console.log(this.newReview)
  }

}
