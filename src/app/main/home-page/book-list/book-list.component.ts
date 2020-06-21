import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Variables } from './../../../shared/variables';
import { AuthService } from 'src/app/auth/auth.service';



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
    private authService: AuthService, 
    private store: Store<{ bookList }>
  ) {

    if (localStorage.getItem('pickedBook')) {
      localStorage.removeItem('pickedBook');
    }
   }

  ngOnInit() {
    
    this.variables.errorCode = 0;

    this.store.select('bookList').subscribe(
              (books: any) => {
                if (books.booksError !== null) {
                  this.HttpErrorResponse = books.booksError;
                  this.variables.LoadSpiner = books.loadSpiner;
                } else if (books.books !== null) {
                  this.variables.errorCode = 0;
                  this.bookList = books.books;
                  this.variables.LoadSpiner = books.loadSpiner;
                } else {
                  this.bookList = JSON.parse(localStorage.getItem('BookList'));
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
