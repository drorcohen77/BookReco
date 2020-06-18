import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { Books } from 'src/app/shared/books.model';
import { Variables } from './../../../../shared/variables';
import { Recommendation } from 'src/app/shared/recommendation.model';
import { HomePageService } from '../../home-page.service';
import { SharedVariables } from '../shared-BookDetails/Shared_variables';
import * as moment from 'moment'
import * as BookReveiwsActions from '../store/book-reviews.actions';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { CanComponentDeactivate } from 'src/app/main/share/can-deactivate-guard.service';
import { AuthService } from 'src/app/auth/auth.service';
import { BookDetailsPlaceholderDirective } from '../shared-BookDetails/book-details-placeholder.directive';



@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss']
})
export class AddReviewComponent implements OnInit,OnDestroy, CanComponentDeactivate {

  @ViewChild(BookDetailsPlaceholderDirective, {static: false}) loginHost: BookDetailsPlaceholderDirective;
  @Input() Book: Books;

  private readonly resBookID = this.HomePageService.bookID$;
  public bookTitle: string;
  public newReview:Recommendation;
  private nowDate: string;
  private close: Subscription;
  private submitReview: boolean = false;
  // private readonly _ID: string = '+RATE';  create bookID to book created from the users
  

  constructor(private sharedVaribles: SharedVariables,
              private authService: AuthService,
              private route: ActivatedRoute,
              private nav: Router,
              private toastr: ToastrService,
              private compFactoryResolver: ComponentFactoryResolver,
              private HomePageService: HomePageService, 
              private storeBookReviews: Store<{ bookReviews }>,
              private storeBookList: Store<{bookList}>
              ) {
    
    if(this.HomePageService.fromCreateNewBook) {
      this.bookTitle = this.route.snapshot.queryParams['book_title'];
    }else{
      this.sharedVaribles.bookID = this.route.snapshot.queryParams['book-id'];
    }
   }

  ngOnInit() {
    
    if(this.HomePageService.fromCreateNewBook) {
      this.authService.logedIn = true;

      this.storeBookList.select('bookList')
              .pipe(
                map((bookID: any) => {
                  return bookID.book;
                })
              )
              .subscribe(
                (ID: string) => {
                  if(ID != null) {
                    this.sharedVaribles.existBookID = ID;
                  }else{
                    this.resBookID.subscribe(
                      (bookID: string) =>{
                        this.sharedVaribles.existBookID = bookID;
                    });
                  }
                }
              );
    }

    this.newReview = new Recommendation();
    this.nowDate = moment().format('DD/MM/YYYY');
    this.newReview = {...this.newReview, createDate: this.nowDate};
  }

  
  public addReveiw() {

    if(this.authService.logedIn) {
      
      this.storeBookReviews.dispatch(
        new BookReveiwsActions.addReview(this.newReview,this.sharedVaribles.existBookID)
      );
      this.toastr.success('Your Review Has Been Successfuly Added!');
      this.sharedVaribles.addRevieButton = false;
      this.nav.navigate(['/main/home/booklist']);
    } else {
        if (!this.HomePageService.fromCreateNewBook){
          this.showLogin();
        }
    }
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
    if (!this.submitReview) {
      return confirm('Do you want to discard the new review you entered and leave the page');
    }else{
      return true;
    }
  }
  

  ngOnDestroy(): void {
    this.sharedVaribles.addRevieButton = false;
    this.HomePageService.fromCreateNewBook = false;
  }

}
