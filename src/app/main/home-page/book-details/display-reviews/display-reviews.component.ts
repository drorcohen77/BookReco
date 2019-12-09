import { Component, OnInit } from '@angular/core';
import { SharedVariables } from '../shared-variables/shared_variables';


@Component({
  selector: 'app-display-reviews',
  templateUrl: './display-reviews.component.html',
  styleUrls: ['./display-reviews.component.scss']
})
export class DisplayReviewsComponent implements OnInit {

  constructor(private sharedVaribles: SharedVariables) { }

  ngOnInit() {
    console.log(this.sharedVaribles.reviews)
  }


  close() {
    this.sharedVaribles.reviewButton = false;
  }
  

}
