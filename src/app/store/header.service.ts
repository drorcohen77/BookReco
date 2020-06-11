import { Injectable } from '@angular/core';
import { Variables } from 'src/app/shared/variables';
import { HttpClient } from '@angular/common/http';
import { Books } from 'src/app/shared/books.model';
import { map, first, tap } from "rxjs/operators";
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private readonly _bookList = new BehaviorSubject<Books[]>([]);
  readonly booksDetails = this._bookList.asObservable();
  private books: Books[] = [];

  constructor(
    private variables: Variables, 
    private http: HttpClient,
  ) { }

  // public searchBook(book) {

  //       this.http
  //         .get<Books[]>(this.variables.url + `${book}` + this.variables.booksAPIkey)
  //         .pipe(
  //           map((result: any) => {
  //             const booksResult = [];
              
  //             for (const item in result.items) {
  //                 booksResult.push({...result.items[item]});
  //             }
  //             this.books = booksResult;
  //             localStorage.setItem('BookList',JSON.stringify(this.books));
  //             this._bookList.next(this.books);

  //             return booksResult;
  //           })
  //         )
  //         .subscribe();
  //     }
}
