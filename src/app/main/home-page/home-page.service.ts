import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from "rxjs/operators";

import { Books } from './../../shared/books.model';
import { Variables } from './../../shared/variables';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  private readonly _bookList = new BehaviorSubject<Books[]>([]);
  readonly booksDetails = this._bookList.asObservable();
  private books: Books[] = []; 

  constructor(private variables: Variables, private http: HttpClient ) { }

  public getApiBooks(){
    return this.http
      .get<Books[]>(this.variables.url + this.variables.booksAPIkey)
      .pipe(
        map((books: any) =>{
          const booksArray = [];
          
          for (const book in books.items) {
            // if(books.items.hasOwnProperty()) {
              booksArray.push({...books.items[book]});
            // }
          }
          return booksArray;
        })
      );
  }


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
          this._bookList.next(this.books);
          console.log(this._bookList)
          return booksResult;
        })
      );
      
      

    // return this.http
    //   .get<Books[]>(this.variables.url + `${book}` + this.variables.booksAPIkey)
    //   .pipe(
    //     map((result: any) => {
    //       const booksResult = [];
          
    //       for (const item in result.items) {
    //         this.books.push({...result.items[item]});
    //       }
    //       return this.books;
    //     })
    //   );
    //   // debugger
    //   this._bookList.next(this.books);
  }

}
