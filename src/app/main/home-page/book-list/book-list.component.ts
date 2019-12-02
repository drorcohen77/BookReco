import { Books } from './../../../shared/books.model';
import { Variables } from './../../../shared/variables';
import { HomePageService } from './../home-page.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {

  
  
  public bookList: Books[] = [];
  public book: string = '';
  public HttpErrorResponse: string;
  private subscription: Subscription; 
  

  constructor(private HomePage: HomePageService, public variables: Variables, private nav: Router) {
    if(localStorage.getItem('pickedBook')) {
      localStorage.removeItem('pickedBook');
    }
   }

  ngOnInit() {

    if(localStorage.getItem('BookList')) {
      this.bookList = JSON.parse(localStorage.getItem('BookList'));
    }
  }

  public searchBook() {
    this.variables.LoadSpiner = true;

    this.subscription = this.HomePage.searchBook(this.book).subscribe(
      (result: Books[]) => {
        this.bookList = result;
        console.log(this.bookList);
      },
      (err: HttpErrorResponse) => {
        if (err.status === 400) {
          this.variables.errorCode = 400;
          this.HttpErrorResponse = "Please enter query or specify your search!";
        }
        this.variables.LoadSpiner = false;
      },
      () => {
        this.variables.LoadSpiner = false;
      }
    );

    this.book = '';
  }


  public bookDetails(bookId: string): void {

    this.nav.navigate(['home/details'],{queryParams: {'book-id':`${bookId}`}});
  }


  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }

    // if(localStorage.getItem('BookList')) {
    //   localStorage.removeItem('BookList');
    // }
  }

}
