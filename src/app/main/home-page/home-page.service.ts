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
   
    return this.db.list('/Books', ref => ref.orderByChild('title').equalTo(`${title}`)).snapshotChanges()
                  .pipe(
                    map((res: any) => {
                      let bookID: string;
                      
                      res.map(book => {
                        bookID = book.key;
                      });
                      return bookID;
                    }),
                    first())
                  .toPromise();
  }


  public addRecommendation(bookID: string,newReview: Recommendation) {

    this.db.list(`Books/${bookID}/recommendation`)
            .push(newReview)
            .then(()=> console.log('success'))
            .catch(err => console.log(err, 'fail'));
  }

  
  public createBook(newBook) {

    this.db.list(`Books/`)
            .push(newBook)
            .then(()=> console.log('success'))
            .catch(err => console.log(err, 'fail'));
  }

}
