import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Variables } from './../../../shared/variables';
import { Books } from './../../../shared/books.model';
import { BookDetailsService } from './book-details.service';
import { SharedVariables } from './shared-BookDetails/Shared_variables';
import * as BookReveiwsActions from '../book-details/store/book-reviews.actions';
import { HomePageService } from '../home-page.service';



@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit, OnDestroy {

  private bookId: string = ''
  private bookDetails: Books;
  private subscripion: Subscription;
  public bookReviews: any = [];
  
  

  constructor(private rout: ActivatedRoute, 
              private sharedVaribles: SharedVariables,
              private bookDetailsService: BookDetailsService,
              private homePageService: HomePageService,
              private variables: Variables,
              private store: Store<{ bookList: { books: Books[] }, bookReviews }>,
              ) {
    
    this.bookId = this.rout.snapshot.queryParams['book-id'];

   }

  ngOnInit() {

    if(!localStorage.getItem('pickedBook') && !this.homePageService.fromCreateNewBook) {
      this.subscripion = this.store
        .select('bookList')
        .pipe(
          map(bookList => {
            return bookList.books;
          })
        )
        .subscribe(
          (books: any) =>{ 
            this.bookDetails = new Books();
            let book;

            for (book of books) {
              if(this.bookId === book.id) {
                this.bookDetails._bookID = book.id;
                this.bookDetails.title = book.volumeInfo.title;
                this.bookDetails.author = book.volumeInfo.authors;
                this.bookDetails.publisher = book.volumeInfo.publisher;
                this.bookDetails.publishedDate = book.volumeInfo.publishedDate;
                this.bookDetails.description = book.volumeInfo.description;
                this.bookDetails.pageCount = book.volumeInfo.pageCount;
                this.bookDetails.categories = book.volumeInfo.categories;
                this.bookDetails.imageLinks = book.volumeInfo.imageLinks.smallThumbnail;
                this.bookDetails.language = book.volumeInfo.language;

                localStorage.setItem('pickedBook', JSON.stringify(this.bookDetails));
              }
            }
        });
          
    }

  }


  public onAddReview() {
    this.sharedVaribles.addRevieButton = true;
    this.sharedVaribles.reviewButton = false;

    this.bookDetailsService.checkBook(this.bookDetails._bookID).subscribe(
      (bookExists: string) => {  
        this.sharedVaribles.existBookID = Object.keys(bookExists).toString();

        if(this.sharedVaribles.existBookID.length === 0) {
        }
      }
    );

    

    
  }


   public onGetReviews() {
    this.sharedVaribles.reviewButton = true;
    this.sharedVaribles.addRevieButton = false;

    this.store.dispatch(
      new BookReveiwsActions.getBookReviews(this.bookDetails._bookID)
    );
  }

  ngOnDestroy(): void {
    this.sharedVaribles.reviewButton = false;
    this.sharedVaribles.addRevieButton = false;
    if (this.subscripion) {
      this.subscripion.unsubscribe();
    }
  }

}
