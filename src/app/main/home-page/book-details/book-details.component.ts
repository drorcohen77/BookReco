import { HomePageService } from './../home-page.service';
import { Books } from './../../../shared/books.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, of } from 'rxjs';



@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit, OnDestroy {

  private bookId: string = ''
  private bookDetails: Books;
  private subscripion: Subscription;

  constructor(private rout: ActivatedRoute, private homePageService: HomePageService, private nav: Router) {
    
    this.bookId = this.rout.snapshot.queryParams['book-id'];

    if(localStorage.getItem('pickedBook')) {
      this.bookDetails = JSON.parse(localStorage.getItem('pickedBook'));
    }
   }

  ngOnInit() {
    
      if(!this.bookDetails) {
      this.subscripion = this.homePageService.booksDetails.subscribe(
        (books: Books[]) =>{ 
          this.bookDetails = new Books();
          let book;

          for (book of books) {
            if(this.bookId === book.id) {
              this.bookDetails._id = book.id;
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

  }


  public addReview(bookID: string) {
    
    // this.nav.navigate(['home/new-review'],{queryParams: {'bookID': `${bookID}`}});
    this.nav.navigate(['/add-review']);
  }


  public review() {

  }

  ngOnDestroy(): void {
    if (this.subscripion) {
      this.subscripion.unsubscribe();
    }
  }

}
