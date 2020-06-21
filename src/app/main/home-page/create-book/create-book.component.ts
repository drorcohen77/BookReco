import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable'

import { Books } from 'src/app/shared/books.model';
import { HomePageService } from '../home-page.service';
import { Variables } from 'src/app/shared/variables';
import { LoginComponent } from '../../../auth/login/login.component';
import { MainPlaceholderDirective } from '../../share/main_placeholder.directive';
import * as moment from 'moment';
import * as BookListActions from '../store/book-list.actions';
import { CanComponentDeactivate } from '../../share/can-deactivate-guard.service';
import { AuthService } from 'src/app/auth/auth.service';
// import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  @ViewChild(MainPlaceholderDirective, {static: false}) loginHost: MainPlaceholderDirective;

  public newBook: Books;
  public bookExist: any;
  public reviewInStorage: any;
  private close: Subscription;
  private submitBook: boolean = false;

  // modalRef: BsModalRef;
  // message: string;
  // private reviewModal: any;

  constructor(private HomePageService: HomePageService,
              private authService: AuthService,
              private modalService: NgbModal, 
              private variables: Variables,
              private compFactoryResolver: ComponentFactoryResolver,
              private store: Store<{ bookList }>
              // private modalServic: BsModalService
              ) { 
    
    this.newBook = new Books;
    if(localStorage.getItem('new_book') && this.variables.register) {
      this.newBook = JSON.parse(localStorage.getItem('new_book'));
      localStorage.removeItem('new_book');
    }
    this.reviewInStorage = JSON.parse(localStorage.getItem('new_review'));
  }

  ngOnInit() {
  }


  public async onCreateBook(moveToReview)  {
    this.HomePageService.fromCreateNewBook = true;
    this.submitBook = true;

    if(!localStorage.getItem('new_book')) {
      this.storeNewBook();
    }
    
    if(!this.authService.logedIn) {
      debugger
      this.submitBook = false;
      this.showLogin();
    }else{
      this.submitBook = true;
   
      let returnBook;
      returnBook = await this.HomePageService.existBook(this.newBook.title, this.newBook.author);
      // needs to use service because needs sync request and effects is an async.
  
      if (returnBook === "") {
        this.store.dispatch(
          new BookListActions.AddBook(this.newBook)
        );
        this.modalService.open(moveToReview);
      } else {
        debugger
          this.modalService.open(moveToReview);
      }
      localStorage.removeItem('new_review');
      // this.authService.logedIn = false;
    }
  }


  private storeNewBook() {
    let newPublishDate = moment(this.newBook.publishedDate).format('DD/MM/YYYY');
    this.newBook = {...this.newBook, publishedDate: newPublishDate};

    if (this.reviewInStorage) {
      this.newBook = {...this.newBook, title: this.reviewInStorage.title};
    }

    let newTitle = this.newBook.title.replace(/[^\w\s]/gi, "").trim().replace(/\b\w/g, (s) => s.toUpperCase());
    this.newBook = {...this.newBook, title: newTitle};

    localStorage.setItem('new_book', JSON.stringify(this.newBook));
  }

  
  private showLogin() {
    
    const loginCmpFactory = this.compFactoryResolver.resolveComponentFactory(LoginComponent);

    const hostviewContainerRef = this.loginHost.viewContainerRef;
    hostviewContainerRef.clear();
    const compRef = hostviewContainerRef.createComponent(loginCmpFactory);

    this.close = compRef.instance.close.subscribe(() => {
      this.close.unsubscribe();
      hostviewContainerRef.clear();
    });
   
  }


  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.submitBook && Object.values(this.newBook).length !== 0) {

      return confirm('Do you want to discard the new book you entered and leave the page');
    }else{
      return true;
    }
  }


  ngOnDestroy() {
    if(this.close) {
      this.close.unsubscribe();
    }
    if(this.variables.register) {
      this.variables.register = false;
    }
  }


}
