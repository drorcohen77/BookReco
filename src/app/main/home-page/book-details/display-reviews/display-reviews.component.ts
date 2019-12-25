import { Component, OnInit, Input } from '@angular/core';
import { BookDetailsService } from '../book-details.service';
import { Recommendation } from 'src/app/shared/recommendation.model';
import { SharedVariables } from '../shared-BookDetails/Shared_variables';


@Component({
  selector: 'app-display-reviews',
  templateUrl: './display-reviews.component.html',
  styleUrls: ['./display-reviews.component.scss']
})
export class DisplayReviewsComponent implements OnInit {

  @Input() BookReviews: Recommendation[];

  constructor(private sharedVaribles: SharedVariables, private bookDetailsService: BookDetailsService) { }

  ngOnInit() {
    
    console.log(this.BookReviews)
  }
  


  close() {
    this.sharedVaribles.reviewButton = false;
  }
  

}
