import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
import { map, first, tap } from "rxjs/operators";
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
// import { Store } from '@ngrx/store';
// import { BehaviorSubject } from 'rxjs';

import { Recommendation } from './../../shared/recommendation.model';
import { Books } from './../../shared/books.model';
import { Variables } from './../../shared/variables';
import { BehaviorSubject } from 'rxjs';
// import * as BookListActions from './store/book-list.actions';
// import * as fromApp from '../../store/app.reducer';




@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  private readonly _book = new BehaviorSubject<string>(null);
  readonly bookID$ = this._book.asObservable();
  private books: Books[] = []; 
  public Exist_Book: boolean;
  public sharedVaribles: any;

  constructor(
    private variables: Variables, 
    private http: HttpClient, 
    private db: AngularFireDatabase, 
    private DB: AngularFirestore, 
    // private store: Store<fromApp.AppState > 
    ) { }

  // public getApiBooks(){
  //   return this.http
  //     .get<Books[]>(this.variables.url + this.variables.booksAPIkey)
  //     .pipe(
  //       map((books: any) =>{
  //         const booksArray = [];
          
  //         for (const book in books.items) {
  //             booksArray.push({...books.items[book]});
  //         }
  //         return booksArray;
  //       })
  //     );
  // }

//check
//   public searchBook(book) {
// debugger
//     return this.http
//       .get<Books[]>(this.variables.url + `${book}` + this.variables.booksAPIkey)
//       .pipe(
//         map((result: any) => {
//           const booksResult = [];
          
//           for (const item in result.items) {
//               booksResult.push({...result.items[item]});
//           }
//           this.books = booksResult;
//           localStorage.setItem('BookList',JSON.stringify(this.books));
//           this._bookList.next(this.books);

//           return booksResult;
//         })
//       );
//   }


  public existBook(title: string, author: string) {
debugger
    this.Exist_Book = false;

    return this.http
      .get<Books[]>(this.variables.FirebaseDB + `Books.json`)
      .pipe(
        map((bookReco: any) => {
          let books: Books[] = Object.values(bookReco);
          let booksIndex: Array<string> = Object.keys(bookReco);
          let bookID:string = '';
          
          books.forEach((book,index) => {
            if (book.title.indexOf(title) !== -1 && (book.author == undefined || book.author[0].indexOf(author) !== -1)){
              this.Exist_Book = true;
              bookID = booksIndex[index];
              this._book.next(bookID);
            }
          });
          return bookID;
        })
    )
    .toPromise();

    // this.variables.unIntercepted = true;

    // return this.db.list('/Books', ref => ref.orderByChild('title').equalTo(`${title}`)).snapshotChanges()
    //               .pipe(
    //                 map((res: any) => {
    //                   let bookID: string;

    //                   res.map(book => {
    //                     bookID = book.key;
    //                   });
    //                   if (bookID != undefined) {
    //                       this.Exist_Book = true;
    //                   }
    //                   return bookID;
    //                 } ),
    //                 first()
    //               )
    //               .toPromise();


    // return this.http
    //             .get(this.variables.FirebaseDB + `Books.json?orderBy="_bookID"&equalTo="iY4yZEkphNgC"&print=pretty`)
    //             .pipe(
    //               map((bookExists: any) => {
    //                 let bookID: string;
    //                   debugger
    //                   console.log(bookExists,bookExists.key)
    //                 bookID = Object.values(bookExists).toString();
    //                 if (bookID != "") {
    //                   this.Exist_Book = true;
    //                 }
    //                 return bookID;
    //               })
    //           )
    //           .toPromise();
  }


  // public addRecommendation(bookID: string,newReview: any) {

  //   // this.store.dispatch(new HomePageListActions.AddRecommedation({bookID, newReview}));

  //   if (newReview.title) {
  //     delete newReview.title;
  //   }
    
  //   return this.db.list(`Books/${bookID}/recommendation`)
  //           .push(newReview).key;
  // }

  
  
  // public async createBook(newBook: Books) {

  //   // this.store.dispatch(new HomePageListActions.CreateBook(newBook));

  //   this.Exist_Book = false;
  //   let newTitle = newBook.title.replace(/[^\w\s]/gi, "").trim().replace(/\b\w/g, (s) => s.toUpperCase());
  //   newBook = {...newBook, title: newTitle};

  //   if (localStorage.getItem('new_review')) {
  //     let new_Review: any;
  //     new_Review = JSON.parse(localStorage.getItem('new_review'));
  //     delete new_Review.title ;
       
  //     let bookKey = this.db.list(`Books/`).push(newBook).key;

  //     this.addRecommendation(bookKey,new_Review);

  //   } else {
  //     let returnBook: string;
  //     returnBook = await this.existBook(newBook.title);

  //     if (returnBook === undefined) {
  //       return this.db.list(`Books/`).push(newBook).key;

  //     } else {
  //         return returnBook;
  //     }
  //   }
  // }

}
