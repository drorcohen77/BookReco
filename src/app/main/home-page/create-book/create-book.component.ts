import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Books } from 'src/app/shared/books.model';
import { HomePageService } from '../home-page.service';
import { Variables } from 'src/app/shared/variables';
import { LoginComponent } from '../../../auth/login/login.component';
import { MainPlaceholderDirective } from '../../share/main_placeholder.directive';
import * as moment from 'moment';
import * as BookListActions from '../store/book-list.actions';
// import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit, OnDestroy {

  @ViewChild(MainPlaceholderDirective, {static: false}) loginHost: MainPlaceholderDirective;

  public newBook: Books;
  public bookExist: any;
  public reviewInStorage: any;
  private close: Subscription;

  // modalRef: BsModalRef;
  // message: string;
  // private reviewModal: any;

  constructor(private HomePageService: HomePageService,
              private nav: Router, 
              private modalService: NgbModal, 
              private toastr: ToastrService,
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
    // this.variables.logedIn = true;
  }

  ngOnInit() {
  }


  public async onCreateBook(moveToReview)  {
    this.variables.fromCreateNewBook = true;
    debugger
    if(!localStorage.getItem('new_book')) {
      this.storeNewBook();
    }
    
    if(!this.variables.logedIn) {
      this.showLogin();
    }else{
    // if(this.variables.logedIn) {

    // let newPublishDate = moment(this.newBook.publishedDate).format('DD/MM/YYYY');
    // this.newBook = {...this.newBook, publishedDate: newPublishDate};

    // if (this.reviewInStorage) {
    //   this.newBook = {...this.newBook, title: this.reviewInStorage.title};
    // }

    // let newTitle = this.newBook.title.replace(/[^\w\s]/gi, "").trim().replace(/\b\w/g, (s) => s.toUpperCase());
    // this.newBook = {...this.newBook, title: newTitle};
        
      let returnBook;
      returnBook = await this.HomePageService.existBook(this.newBook.title, this.newBook.author);
  
      if (returnBook === "") {
        debugger
          // return this.db.list(`Books/`).push(this.newBook).key;
        this.store.dispatch(
          new BookListActions.AddBook(this.newBook)
        );
        // this.toastr.success('Your Book Has Been Successfuly Added!');
        // this.variables.fromCreateNewBook = true;
        
          // this.modalRef = this.modalServic.show(moveToReview, {class: 'modal-sm'});
        // this.reviewModal = moveToReview;
        this.modalService.open(moveToReview);
          // this.nav.navigate(['/home/booklist']);
      } else {
          // localStorage.setItem('new_book', JSON.stringify(this.newBook));
          // this.variables.fromCreateNewBook = true;
          this.modalService.open(moveToReview);
      }
      // }
      localStorage.removeItem('new_review');
      this.variables.logedIn = false;
    }
    // localStorage.removeItem('new_book');
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
    debugger
    const loginCmpFactory = this.compFactoryResolver.resolveComponentFactory(LoginComponent);

    const hostviewContainerRef = this.loginHost.viewContainerRef;
    hostviewContainerRef.clear();
    const compRef = hostviewContainerRef.createComponent(loginCmpFactory);

    this.close = compRef.instance.close.subscribe(() => {
      this.close.unsubscribe();
      hostviewContainerRef.clear();
    });
   
  }


  ngOnDestroy() {
    if(this.close) {
      this.close.unsubscribe();
    }
    if(this.variables.register) {
      // localStorage.removeItem('new_book');
      this.variables.register = false;
    }
  }

  //   let newPublishDate = moment(this.newBook.publishedDate).format('DD/MM/YYYY');
  //   this.newBook = {...this.newBook, publishedDate: newPublishDate};

  //   if (this.reviewInStorage) {
  //     this.newBook = {...this.newBook, title: this.reviewInStorage.title};
  //   }
    
  //   this.HomePageService.createBook(this.newBook).then(
  //     (book: any) =>{
  //       this.bookExist = book;
  //       if (localStorage.getItem('new_review')) {
  //         this.toastr.success('Your Book Has Been Successfuly Added!')
  //         this.nav.navigate(['/home/booklist']);
  //       } else {
  //         localStorage.setItem('new_book', JSON.stringify(this.newBook));
  //         this.modalService.open(moveToReview);
  //       }
  //       localStorage.removeItem('new_review');
  //     } 
  //   );
  // }

}
