import { Variables } from './../../../shared/variables';
import { HomePageService } from './../home-page.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Books } from 'src/app/shared/books.model';
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
  

  constructor(private HomePage: HomePageService, public variables: Variables, private nav: Router) { }

  ngOnInit() {

    // this.HomePage.getApiBooks().subscribe(
    //   BookList => {
    //   this.bookList = BookList;
    //   console.log(this.bookList)
    // },
    // err => {});
  }

  public searchBook() {
    this.variables.LoadSpiner = true;

    // this.subscription = this.HomePage.booksDetails.subscribe(result => {
    //   this.bookList = result;
    //   console.log(this.bookList)
    // })


    this.subscription = this.HomePage.searchBook(this.book).subscribe(
      (result) => {
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
    this.nav.navigate(['home/details'],{queryParams: {'book-id':`${bookId}`}})
  }


  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

}
