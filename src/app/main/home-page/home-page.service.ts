import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, tap } from "rxjs/operators";

import { Books } from './../../shared/books.model';
import { Variables } from './../../shared/variables';
import { BehaviorSubject } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';



@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  private readonly _bookList = new BehaviorSubject<Books[]>([]);
  readonly booksDetails = this._bookList.asObservable();
  private books: Books[] = []; 

  constructor(private variables: Variables, private http: HttpClient, private db: AngularFireDatabase ) { }

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
          localStorage.setItem('BookList',JSON.stringify(this.books));
          this._bookList.next(this.books);

          return booksResult;
        })
      );
  }


  public existBook(newReco: any) {
    console.log(newReco.title,newReco)
    return this.db.list('/Books', ref => ref.orderByChild('title').equalTo(`${newReco.title}`)).valueChanges()
                  .pipe(map((res: any) => {
                      if(res.length === 0) {
                        return false;
                      } else {
                        return true;
                      }
                    })
                  );

    // this.db.list('/Books', { query: { orderByChild: 'title', equalTo: 'On War' } });
    // console.log(x )
  }


  public addRecommendation() {
    console.log('add')
  }

}
