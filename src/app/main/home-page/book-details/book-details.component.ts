import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Variables } from './../../../shared/variables';
// import { HomePageService } from './../home-page.service';
import { Books } from './../../../shared/books.model';
import { BookDetailsService } from './book-details.service';
import { SharedVariables } from './shared-BookDetails/Shared_variables';
import * as BookReveiwsActions from '../book-details/store/book-reviews.actions';



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
              private variables: Variables,
              private store: Store<{ bookList: { books: Books[] }, bookReviews }>,
              // private reviewsStore :Store<{bookReviews}> 
              ) {
    
    this.bookId = this.rout.snapshot.queryParams['book-id'];

   }

  ngOnInit() {

    if(!localStorage.getItem('pickedBook')) {
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
                console.log(this.bookDetails)
              }
            }
        });
          
    }
    
    //   if(!localStorage.getItem('pickedBook')) {
    //   this.subscripion = this.homePageService.booksDetails.subscribe(//change to ngrx state
    //     (books: Books[]) =>{ 
    //       this.bookDetails = new Books();
    //       let book;
    //       console.log(books)

    //       for (book of books) {
    //         if(this.bookId === book.id) {
    //           this.bookDetails._bookID = book.id;
    //           this.bookDetails.title = book.volumeInfo.title;
    //           this.bookDetails.author = book.volumeInfo.authors;
    //           this.bookDetails.publisher = book.volumeInfo.publisher;
    //           this.bookDetails.publishedDate = book.volumeInfo.publishedDate;
    //           this.bookDetails.description = book.volumeInfo.description;
    //           this.bookDetails.pageCount = book.volumeInfo.pageCount;
    //           this.bookDetails.categories = book.volumeInfo.categories;
    //           this.bookDetails.imageLinks = book.volumeInfo.imageLinks.smallThumbnail;
    //           this.bookDetails.language = book.volumeInfo.language;

    //           localStorage.setItem('pickedBook', JSON.stringify(this.bookDetails));
    //           console.log(this.bookDetails)
    //         }
    //       }
    //   });
    // }

  }


  public onAddReview() {
    this.sharedVaribles.addRevieButton = true;
    this.sharedVaribles.reviewButton = false;
    console.log(this.bookDetails._bookID,this.sharedVaribles.reviewButton)
    // this.store.dispatch(
    //   new BookReveiwsActions.checkBookExists(this.bookDetails._bookID)
    // );

    // this.store
    //   .select('bookReviews')
    //   .pipe(
    //     map((res) =>{
    //       console.log(res)
    //       return res.bookExists;
    //     })
    //   )
    //   .subscribe(
    //     (bookExists: string) => {  
    //       debugger
  
    //       if(bookExists == undefined) {
    //         debugger
    //         this.store.dispatch(
    //           new BookReveiwsActions.createBook(this.bookDetails)
    //         );
    //       }
    //     }
    //   );

    this.bookDetailsService.checkBook(this.bookDetails._bookID).subscribe(
      (bookExists: string) => {  
        this.sharedVaribles.existBookID = Object.keys(bookExists).toString();

        if(this.sharedVaribles.existBookID.length === 0) {
          
          // this.bookDetailsService.creatBook(this.bookDetails).subscribe(
          //   (itemID: string) => {
          //     this.sharedVaribles.existBookID = Object.values(itemID).toString();
          //   });

          // this.store.dispatch(
          //   new BookReveiwsActions.createBook(this.bookDetails)
          // );
        }
      }
    );

    

    
  }


   public onGetReviews() {
    this.sharedVaribles.reviewButton = true;
    this.sharedVaribles.addRevieButton = false;
debugger
    this.store.dispatch(
      new BookReveiwsActions.getBookReviews(this.bookDetails._bookID)
    );
    // this.bookReviews = await this.bookDetailsService.getBookReviews(this.bookDetails._bookID);
    
    // this.sharedVaribles.addRevieButton = false;
    // this.variables.LoadSpiner = false;
  }

  ngOnDestroy(): void {
    this.sharedVaribles.reviewButton = false;
    this.sharedVaribles.addRevieButton = false;
    if (this.subscripion) {
      this.subscripion.unsubscribe();
    }
  }

}
