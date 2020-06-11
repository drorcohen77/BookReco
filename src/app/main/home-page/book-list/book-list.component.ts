import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map, first } from "rxjs/operators";

import { Books } from './../../../shared/books.model';
import { Variables } from './../../../shared/variables';
import { HomePageService } from './../home-page.service';
import * as BookListActions from '../store/book-list.actions';
import { HeaderService } from 'src/app/store/header.service';
import * as BookReveiwsActions from '../book-details/store/book-reviews.actions';

//import { HeaderService } from 'src/app/store/header.service';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
 
  // private readonly googleBooksSearchRes = this.Header.booksDetails;//check
  public bookList: any = [];
  public book: string = '';
  public HttpErrorResponse: string;
  private subscription: Subscription; 
  

  constructor(
    public variables: Variables, 
    private Header: HeaderService,
    //private HomePage: HomePageService, 
    private nav: Router, 
    private store: Store<{ bookList }>
  ) {

    if(localStorage.getItem('pickedBook')) {
      localStorage.removeItem('pickedBook');
    }
   }

  ngOnInit() {
      
    //debugger
    this.variables.errorCode = 0;
// console.log(this.bookList)
    // if(localStorage.getItem('BookList')) {
    //   this.bookList = JSON.parse(localStorage.getItem('BookList'));
    //   // this.variables.LoadSpiner = false; //get inside the store.select.subscription
    //   console.log(this.bookList);
    // }
    // else{
      // if (!this.bookList) {
      //   this.variables.LoadSpiner = true;
      // }else {
    // this.subscription = 
    this.store.select('bookList').subscribe(
              (books: any) => {
                if (books.books === ''|| books.books === undefined) {
                  this.HttpErrorResponse = books.booksError;
                // }else if(localStorage.getItem('BookList')) {
                //   this.bookList = JSON.parse(localStorage.getItem('BookList'));
                  this.variables.LoadSpiner = books.loadSpiner;
                }else {
                  console.log( books)
                  this.variables.errorCode = 0;
                  this.bookList = books.books;
                  console.log( this.bookList)
                  // books.loadSpiner = false;
                  this.variables.LoadSpiner = books.loadSpiner;
                  console.log( this.variables.LoadSpiner)
                }
              }
            );
      // } 
    
    //check
    //this.variables.LoadSpiner = true;
    
      //this.subscription = this.HomePage.searchBook(this.book).subscribe(
    // this.subscription = this.googleBooksSearchRes.subscribe(

    //     (result: Books[]) => {
    //       this.bookList = result;
    //       this.variables.LoadSpiner = false;
    //     },
    //     (err: HttpErrorResponse) => {
    //       if (err.status === 400) {
    //         this.variables.errorCode = 400;
    //         this.HttpErrorResponse = "Please enter query or specify your search!";
    //       }
    //       this.variables.LoadSpiner = false;
    //     },
    //     () => {
    //       this.variables.LoadSpiner = false;
    //     }
    //   );
    
  }

  // public searchBook() {
    
  //   this.variables.LoadSpiner = false;

  //   this.store.dispatch(
  //     new BookListActions.SearchBook(this.book)
  //   );

  //   this.subscription = this.store
  //         .select('bookList')
  //         .subscribe(
  //           (books: any) => {
  //             if (books.books === '') {
  //               this.HttpErrorResponse = books.booksError;
  //             }else {
  //               console.log( books)
  //               this.variables.errorCode = 0;
  //               this.bookList = books.books;
  //               console.log( this.bookList)
  //               this.variables.LoadSpiner = books.loadSpiner;
  //               console.log( this.variables.LoadSpiner)
  //             }
  //           }
  //         );

  //   //   (err: HttpErrorResponse) => {
  //   //     if (err.status === 400) {
  //   //       this.variables.errorCode = 400;
  //   //       this.HttpErrorResponse = "Please enter query or specify your search!";
  //   //     }
  //   //     this.variables.LoadSpiner = false;
  //   //   },
  //   //   () => {
  //   //     this.variables.LoadSpiner = false;
  //   //   }
  //   // );



  //   this.book = '';
  // }


  public bookDetails(bookId: string): void {

    // this.store.dispatch(
    //   new BookReveiwsActions.getBookReviews(bookId)
    // );

    this.nav.navigate(['/home/details'],{
      queryParams: {'book-id':`${bookId}`}
    });
  }


  // ngOnDestroy(): void {
  //   if(this.subscription){
  //     this.subscription.unsubscribe();
  //   }
  // }

}
