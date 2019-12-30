import { Component, OnInit } from '@angular/core';
import { Books } from 'src/app/shared/books.model';
import { Router } from '@angular/router';
import { HomePageService } from '../home-page.service';


@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.sass']
})
export class CreateBookComponent implements OnInit {

  public newBook: Books;

  constructor(private HomePageService: HomePageService, private nav: Router) { 
    this.newBook = new Books;
  }

  ngOnInit() {
  }


  public onCreateBook()  {
    console.log(this.newBook)
    this.HomePageService.createBook(this.newBook);
  }

}
