import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { switchMap, catchError, map, switchMapTo, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as BookReviewsActions from '../store/book-reviews.actions'
import { Recommendation } from 'src/app/shared/recommendation.model';
import { Variables } from 'src/app/shared/variables';
import { SharedVariables } from '../shared-BookDetails/Shared_variables';


@Injectable()

export class BookReviewsEffects {

    @Effect()
    bookReviews = this.actions$.pipe(
                        ofType(BookReviewsActions.GET_BOOK_REVIEWS),
                        switchMap((getBookIDReviews: BookReviewsActions.getBookReviews) => {
                            let reco;

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



    @Effect({dispatch: false})
    newReview = this.actions$.pipe(
                        ofType(BookReviewsActions.ADD_REVIEW),
                        switchMap((addNewReview: BookReviewsActions.addReview) => {

                            return this.http.post(
                                this.variables.FirebaseDB + `Books/${addNewReview.bookID}/recommendation.json`,addNewReview.payload
                                )
                        }),
                        catchError((error: HttpErrorResponse) => {
                            return of();
                        })
                    );

                    

    constructor(
        private actions$: Actions, 
        private http: HttpClient, 
        private variables: Variables,
        ) {}
} 