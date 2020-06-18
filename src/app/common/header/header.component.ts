import { Component, OnInit, OnDestroy, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import { Variables } from 'src/app/shared/variables';
import * as BookListActions from '../../main/home-page/store/book-list.actions'
import { LoginComponent } from 'src/app/auth/login/login.component';
import { AppPlaceholderDirective } from 'src/app/shared/app_placeholder.directive';
import { AuthService } from '../../auth/auth.service';
import { HomePageService } from 'src/app/main/home-page/home-page.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @ViewChild(AppPlaceholderDirective, {static: false}) loginHost: AppPlaceholderDirective;


  public bookList: any = [];
  public book: string = '';
  public HttpErrorResponse: string;
  private close: Subscription;


  constructor(public authService: AuthService,
              private homePageService: HomePageService,
              private variables: Variables, 
              private nav: Router, 
              private store: Store<{ bookList }>,
              private compFactoryResolver: ComponentFactoryResolver
            ) { }

  ngOnInit() {
  }


  public searchBook() {

    this.nav.navigate(['/main/home/booklist']);//clean up all debuggers and check if needs here navigate or in boklist effects, to see the loading spinner

    this.store.dispatch(
      new BookListActions.SearchBook(this.book)
    );

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
    this.authService.logedIn = false;
    this.nav.navigate(['/main/home/booklist']);
  }


  public signUp() {
    this.homePageService.fromCreateNewBook = false;
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

  public removLocalStorge(): void {
    
    if(localStorage.getItem('BookList')) {
      localStorage.removeItem('BookList');
    }
  }

}
