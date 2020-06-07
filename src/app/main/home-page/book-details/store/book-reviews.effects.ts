import { Effect, ofType, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, catchError, map, switchMapTo, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

import * as BookReviewsActions from '../store/book-reviews.actions'
import { Recommendation } from 'src/app/shared/recommendation.model';
import { Variables } from 'src/app/shared/variables';
import { SharedVariables } from '../shared-BookDetails/Shared_variables';
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable()

export class BookReviewsEffects {

    @Effect()
    bookReviews = this.actions$.pipe(
                        ofType(BookReviewsActions.GET_BOOK_REVIEWS),
                        switchMap((getBookIDReviews: BookReviewsActions.getBookReviews) => {
                            let reco;
debugger
                            return this.http
                                .get<Recommendation[]>(this.variables.FirebaseDB + 
                                    `Books.json?orderBy="_bookID"&equalTo="${getBookIDReviews.payload}"&print=pretty`
                                )
                                .pipe(
                                    map((bookReco: any) => {
                                        reco = Object.values(bookReco);
                                        let res;
                                        
                                        if(reco.length !== 0 && reco[0].recommendation !== undefined) {
                                            res = Object.values(reco[0].recommendation);
                                            return new BookReviewsActions.resBookReviews(res);
                                        }else{
                                            return new BookReviewsActions.resBookReviews(reco);
                                        }
                                    })
                                )
                                // .toPromise();
                        }),
                        catchError((error: HttpErrorResponse) => {
                            return of();
                        })
                    );

// @Effect({dispatch: false})
// resBookReviews = this.actions$.pipe(
//     ofType(BookReviewsActions.RES_BOOK_REVIEWS),
//     tap(() => { debugger; console.log('OK'); } )
// )
    // @Effect({dispatch: false})
    // bookExists = this.actions$.pipe(
    //                     ofType(BookReviewsActions.CHECK_BOOK_EXISTS),
    //                     switchMap((checkBook: BookReviewsActions.checkBookExists) => {
    //                         return this.http
    //                             .get(this.variables.FirebaseDB + `Books.json?orderBy="_bookID"&equalTo="${checkBook.payload}"&print=pretty`)
    //                             .pipe(
    //                                 map((bookExists: string) => {
    //                                     debugger
    //                                     console.log(bookExists)
    //                                     return this.sharedVaribles.existBookID = Object.keys(bookExists).toString();
    //                                 //   debugger
    //                                 //     if(this.sharedVaribles.existBookID.length === 0) {
    //                                 //         return new BookReviewsActions.createBook(checkBook.Bookpayload);
    //                                 //     }
    //                                 })
    //                             );
    //                     }),
    //                     catchError((error: HttpErrorResponse) => {
    //                         return of();
    //                     })
    //                 );


    // @Effect({dispatch: false})
    // newBook = this.actions$.pipe(
    //                     ofType(BookReviewsActions.CREATE_BOOK),
    //                     switchMap((createNewBook: BookReviewsActions.createBook) => {
    //                         debugger
    //                         return this.http.post(this.variables.FirebaseDB + `Books.json`,createNewBook.payload);
    //                     }),
    //                     catchError((error: HttpErrorResponse) => {
    //                         return of();
    //                     })
    //                 );


    @Effect({dispatch: false})
    newReview = this.actions$.pipe(
                        ofType(BookReviewsActions.ADD_REVIEW),
                        switchMap((addNewReview: BookReviewsActions.addReview) => {
                            debugger
                            return this.http.post(
                                this.variables.FirebaseDB + `Books/${this.sharedVaribles.existBookID}/recommendation.json`,addNewReview.payload
                                )
                        }),
                        catchError((error: HttpErrorResponse) => {
                            return of();
                        })
                    );

    // @Effect()
    // newReview = this.actions$.pipe(
    //                     ofType(BookReviewsActions.ADD_REVIEW),
    //                     switchMap((review: BookReviewsActions.addReview) => {
                         
    //                         if (review.payload.title) {
    //                             delete review.payload.title;
    //                         }
                              
    //                         return this.db.list(`Books/${this.sharedVaribles.existBookID}/recommendation`)
    //                                   .push(review.payload).key;
    //                     }),
    //                     catchError((error: HttpErrorResponse) => {
    //                         return of();
    //                     })
    //             );
                    

    constructor(
        private actions$: Actions, 
        private http: HttpClient, 
        private variables: Variables, 
        private sharedVaribles: SharedVariables,
        private db: AngularFireDatabase
        ) {}
} 