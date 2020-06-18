import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Variables } from './../../../shared/variables';



@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
 

  public bookList: any = [];
  public book: string = '';
  public HttpErrorResponse: string;
  

  constructor(
    public variables: Variables, 
    private nav: Router, 
    private store: Store<{ bookList }>
  ) {

    if(localStorage.getItem('pickedBook')) {
      localStorage.removeItem('pickedBook');
    }
   }

  ngOnInit() {
      
    this.variables.errorCode = 0;

    this.store.select('bookList').subscribe(
              (books: any) => {
                if (books.books === ''|| books.books === undefined) {
                  this.HttpErrorResponse = books.booksError;
                  this.variables.LoadSpiner = books.loadSpiner;
                }else {
                  this.variables.errorCode = 0;
                  this.bookList = books.books;
                  this.variables.LoadSpiner = books.loadSpiner;
                }
              }
            );
  }


  public bookDetails(bookId: string): void {

    this.nav.navigate(['/main/home/details'],{
      queryParams: {'book-id':`${bookId}`}
    });
  }

}
