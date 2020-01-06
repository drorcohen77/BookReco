import { Recommendation } from './../../shared/recommendation.model';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, first } from "rxjs/operators";

import { Books } from './../../shared/books.model';
import { Variables } from './../../shared/variables';
import { BehaviorSubject } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  private readonly _bookList = new BehaviorSubject<Books[]>([]);
  readonly booksDetails = this._bookList.asObservable();
  private books: Books[] = []; 
  public Exist_Book: boolean;

  constructor(private variables: Variables, private http: HttpClient, private db: AngularFireDatabase, private DB: AngularFirestore ) { }

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


  public searchBook(book) {

    return this.http
      .get<Books[]>(this.variables.url + `${book}` + this.variables.booksAPIkey)
      .pipe(
        map((result: any) => {
          const booksResult = [];
          
          for (const item in result.items) {
              booksResult.push({...result.items[item]});
          }
          this.books = booksResult;
          localStorage.setItem('BookList',JSON.stringify(this.books));
          this._bookList.next(this.books);

          return booksResult;
        })
      );
  }


  public existBook(title: string) {

    this.Exist_Book = false;
    return this.db.list('/Books', ref => ref.orderByChild('title').equalTo(`${title}`)).snapshotChanges()
                  .pipe(
                    map((res: any) => {
                      let bookID: string;
                      
                      res.map(book => {
                        bookID = book.key;
                      });
                      if (bookID != undefined) {
                          this.Exist_Book = true;
                      }
                      return bookID;
                    }),
                    first())
                  .toPromise();
  }


  public addRecommendation(bookID: string,newReview: any) {

    if (newReview.title) {
      delete newReview.title;
    }
    
    return this.db.list(`Books/${bookID}/recommendation`)
            .push(newReview).key;
  }

  
  public async createBook(newBook) {

    this.Exist_Book = false;
    let newTitle = newBook.title.replace(/[^\w\s]/gi, "").trim().replace(/\b\w/g, (s) => s.toUpperCase());
    newBook = {...newBook, title: newTitle};

    if (localStorage.getItem('new_review')) {
      let new_Review: any;
      new_Review = JSON.parse(localStorage.getItem('new_review'));
      delete new_Review.title ;
       
      let bookKey = this.db.list(`Books/`).push(newBook).key;

      this.addRecommendation(bookKey,new_Review);

    } else {
      let returnBook: string;
      returnBook = await this.existBook(newBook.title);

      if (returnBook === undefined) {
        return this.db.list(`Books/`).push(newBook).key;

      } else {
          return returnBook;
      }
    }
  }

}
