import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { Books } from 'src/app/shared/books.model';
import { Variables } from './../../../../shared/variables';
import { Recommendation } from 'src/app/shared/recommendation.model';
import { BookDetailsService } from '../book-details.service';
import { HomePageService } from '../../home-page.service';
import { SharedVariables } from '../shared-BookDetails/Shared_variables';
import * as moment from 'moment'
import * as BookReveiwsActions from '../store/book-reviews.actions';
import { MainPlaceholderDirective } from '../../../../main/share/main_placeholder.directive';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss']
})
export class AddReviewComponent implements OnInit,OnDestroy {

  @ViewChild(MainPlaceholderDirective, {static: false}) loginHost: MainPlaceholderDirective;
  @Input() Book: Books;

  private readonly resBookID = this.HomePageService.bookID$;
  public bookTitle: string;
  public newReview:Recommendation;
  private nowDate: string;
  private close: Subscription;
  // private readonly _ID: string = '+RATE';
  

  constructor(private sharedVaribles: SharedVariables,
              private bookDetailsService: BookDetailsService,
              private route: ActivatedRoute,
              private nav: Router,
              private variables: Variables,
              private toastr: ToastrService,
              private compFactoryResolver: ComponentFactoryResolver,
              private HomePageService: HomePageService, 
              private storeBookReviews: Store<{ bookReviews }>,
              private storeBookList: Store<{bookList}>
              ) {
    
    if(this.variables.fromCreateNewBook) {
      this.bookTitle = this.route.snapshot.queryParams['book_title'];
    }else{
      this.sharedVaribles.bookID = this.route.snapshot.queryParams['book-id'];
    }
   }

  ngOnInit() {
    debugger
    if(this.variables.fromCreateNewBook) {
      this.variables.logedIn = true;

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
    // console.log(this.newReview.createDate,this.sharedVaribles.bookID)
    // console.log(this.variables.logedIn)
  }

  
  public addReveiw() {
debugger
    if(this.variables.logedIn) {
      
      // this.sharedVaribles.bookReviews = new Books();
      // this.sharedVaribles.bookReviews = {...this.Book,recommendation: []};

      // this.sharedVaribles.bookReviews.recommendation.push(this.newReview) ;
      
      this.storeBookReviews.dispatch(
        new BookReveiwsActions.addReview(this.newReview)
      );
      // this.bookDetailsService.addReview(this.sharedVaribles.bookReviews.recommendation);
      this.toastr.success('Your Review Has Been Successfuly Added!');
      this.sharedVaribles.addRevieButton = false;
      this.nav.navigate(['/home/booklist']);
    } else {
        // this.nav.navigate(['/login']);
        if (!this.variables.fromCreateNewBook){
          this.showLogin();
        }
    }
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
  

  ngOnDestroy(): void {
    this.sharedVaribles.addRevieButton = false;
    this.variables.fromCreateNewBook = false;
  }

}
