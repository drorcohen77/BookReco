import { Recommendation } from './../../../shared/recommendation';
import { HomePageService } from './../home-page.service';
import { Component, OnInit } from '@angular/core';
import { Books } from 'src/app/shared/books.model';



@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.scss']
})
export class CreateReviewComponent implements OnInit {

 
  public pickedBook: Books;
  

  constructor(private HomePageService: HomePageService) {}

  ngOnInit() {
    
    if (localStorage.getItem('pickedBook')) {
      this.pickedBook = JSON.parse(localStorage.getItem('pickedBook'));
      console.log(this.pickedBook)
    }
  }


  

}
