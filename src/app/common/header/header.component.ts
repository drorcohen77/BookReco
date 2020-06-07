import { Component, OnInit, OnDestroy, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { Books } from 'src/app/shared/books.model';
import { Variables } from 'src/app/shared/variables';
import * as BookListActions from '../../main/home-page/store/book-list.actions'
import { LoginComponent } from 'src/app/auth/login/login.component';
import { AppPlaceholderDirective } from 'src/app/shared/app_placeholder.directive';
//import { HeaderService } from '../../store/header.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HeaderService } from 'src/app/store/header.service';

//import { HeaderService } from 'src/app/common/header/header.service';//check



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @ViewChild(AppPlaceholderDirective, {static: false}) loginHost: AppPlaceholderDirective;

  // private subscription: Subscription;
  public bookList: any = [];
  public book: string = '';
  public HttpErrorResponse: string;
  private close: Subscription;


  constructor(
    // private header: HeaderService,//check
              private variables: Variables, 
              private nav: Router, 
              private store: Store<{ bookList }>,
              private compFactoryResolver: ComponentFactoryResolver
            ) { }

  ngOnInit() {
  }


  public searchBook() {
    
    this.variables.LoadSpiner = true;

    this.store.dispatch(
      new BookListActions.SearchBook(this.book)
    );

    this.nav.navigate(['/home/booklist']);
//check
    //this.header.searchBook(this.book);

    // this.subscription = this.header.searchBook(this.book).subscribe(
    //   (result: Books[]) => {
    //     debugger
    //     this.bookList = result;
    //     console.log(this.bookList);
    //   },
    //   (err: HttpErrorResponse) => {
    //     if (err.status === 400) {
    //       this.variables.errorCode = 400;
    //       this.HttpErrorResponse = "Please enter query or specify your search!";
    //     }
    //     this.variables.LoadSpiner = false;
    //   },
    //   () => {
    //     this.variables.LoadSpiner = false;
    //   }
    // );
    // this.nav.navigate(['/home/booklist']);


    // this.nav.navigate(['/home/booklist']);
    // this.subscription = this.store
    //       .select('bookList')
    //       .subscribe(
    //         (books: any) => {
    //           if (books.books === '') {
    //             this.HttpErrorResponse = books.booksError;
    //           }else {
    //             console.log( books)
    //             this.variables.errorCode = 0;
    //             this.bookList = books.books;
    //             console.log( this.bookList)
    //             this.variables.LoadSpiner = books.loadSpiner;
    //             console.log( this.variables.LoadSpiner)
    //           }
    //         }
    //       );

    //   (err: HttpErrorResponse) => {
    //     if (err.status === 400) {
    //       this.variables.errorCode = 400;
    //       this.HttpErrorResponse = "Please enter query or specify your search!";
    //     }
    //     this.variables.LoadSpiner = false;
    //   },
    //   () => {
    //     this.variables.LoadSpiner = false;
    //   }
    // );


    // this.subscription = this.HomePage.searchBook(this.book).subscribe(
    //   (result: Books[]) => {
    //     debugger
    //     this.bookList = result;
    //     console.log(this.bookList);
    //   },
      // (err: HttpErrorResponse) => {
      //   if (err.status === 400) {
      //     this.variables.errorCode = 400;
      //     this.HttpErrorResponse = "Please enter query or specify your search!";
      //   }
      //   this.variables.LoadSpiner = false;
      // },
    //   () => {
    //     this.variables.LoadSpiner = false;
    //   }
    // );
    //this.nav.navigate(['/home/booklist']);
    this.book = '';
  }


  public logIn() {
    
    const loginCmpFactory = this.compFactoryResolver.resolveComponentFactory(LoginComponent);

    const hostviewContainerRef = this.loginHost.viewContainerRef;
    hostviewContainerRef.clear();
    const compRef = hostviewContainerRef.createComponent(loginCmpFactory);
    this.close = compRef.instance.close.subscribe(() => {
      this.close.unsubscribe();
      hostviewContainerRef.clear();
    });
  }


  public logOut() {
    this.variables.logedIn = false;
    this.nav.navigate(['/home/booklist']);
  }


  public signUp() {
    this.variables.fromCreateNewBook = false;
    this.nav.navigate(['/register']);
  }


  ngOnDestroy(): void {
    if(localStorage.getItem('BookList')) {
      localStorage.removeItem('BookList');
    }
    if(localStorage.getItem('new_Book')) {
      localStorage.removeItem('new_Book');
    }
  }
//
  public removLocalStorge(): void {
    
    if(localStorage.getItem('BookList')) {
      localStorage.removeItem('BookList');
    }
  }
//
}
