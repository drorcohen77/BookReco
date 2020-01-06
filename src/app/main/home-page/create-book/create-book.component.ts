import { Component, OnInit } from '@angular/core';
import { Books } from 'src/app/shared/books.model';
import { Router } from '@angular/router';
import { HomePageService } from '../home-page.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.sass']
})
export class CreateBookComponent implements OnInit {

  public newBook: Books;
  public bookExist: any;
  public reviewInStorage: any;


  constructor(private HomePageService: HomePageService, private nav: Router, private modalService: NgbModal) { 
    
    this.reviewInStorage = JSON.parse(localStorage.getItem('new_review'));
    this.newBook = new Books;
  }

  ngOnInit() {

  }


  public onCreateBook(moveToReview)  {
    
    if (this.reviewInStorage) {
      this.newBook = {...this.newBook, title: this.reviewInStorage.title};
    }
    
    this.HomePageService.createBook(this.newBook).then(
      (book: any) =>{
        this.bookExist = book;
        if (localStorage.getItem('new_review')) {
          this.nav.navigate(['/home/booklist']);
        } else {
          localStorage.setItem('new_book', JSON.stringify(this.newBook));
          this.modalService.open(moveToReview);
        }
        localStorage.removeItem('new_review');
      } 
    );
  }

}
