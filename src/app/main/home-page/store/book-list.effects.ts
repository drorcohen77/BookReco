import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { of,Observable  } from 'rxjs';
import { Actions, ofType, Effect } from '@ngrx/effects'
import { switchMap, catchError, map, tap } from 'rxjs/operators';

import * as BookListActions from './book-list.actions'
import { Books } from 'src/app/shared/books.model';
import { Variables } from 'src/app/shared/variables';

@Injectable()

export class BookListEffects {
    @Effect()
    bookList = this.actions$.pipe(
        ofType(BookListActions.SEARCH_BOOK),
        switchMap((itemSearch: BookListActions.SearchBook) => {
            
            return this.http
                .get(this.variables.url + `${itemSearch.payload}` + this.variables.booksAPIkey)
                .pipe(
                    map((resultSearch: any) => {
                        const booksResult = [];
                                    
                        for (const item in resultSearch.items) {
                            booksResult.push({...resultSearch.items[item]});
                        }
                                    
                        localStorage.setItem('BookList',JSON.stringify(booksResult));
                        return new BookListActions.ResultSearchBook(booksResult);
                    }),
                    catchError((error: HttpErrorResponse) => {
                        if (error.status === 400) {
                            this.variables.errorCode = 400;
                            let HttpErrorResponse = "Please enter query or specify your search!";
                            return of(new BookListActions.ErrorSearchBook(HttpErrorResponse));
                        }
                    })
                );
        })
    );
    

    // @Effect({dispatch: false})
    // searchRes = this.actions$.pipe(
    //     ofType(BookListActions.RESULT_SEARCH_BOOK),
    //     tap(() =>{
    //         this.nav.navigate(['/main/home/booklist']);
    //     })
    // );


    @Effect()
    newBook = this.actions$.pipe(
        ofType(BookListActions.ADD_BOOK),
        switchMap((createNewBook: BookListActions.AddBook) => {
            
            return this.http.post(this.variables.FirebaseDB + `Books.json`,createNewBook.payload)
                .pipe(
                    map((bookID: any) => {
                        return new BookListActions.AddedBook(bookID.name);
                    }),
                    catchError((error: HttpErrorResponse) => {
                        return of();
                    })
                );
        })
    );



    constructor(private actions$: Actions,
                private http: HttpClient, 
                private variables: Variables
                ) {}
}