import { Action } from '@ngrx/store';
import { Recommendation } from 'src/app/shared/recommendation.model';
import { Books } from 'src/app/shared/books.model';


export const GET_BOOK_REVIEWS = '[Book Reviews] Get Book Reviews';
export const RES_BOOK_REVIEWS = '[Book Reviews] Result Book Reviews';
export const CLOSE_REVIEWS_DISPLAY = '[Book Reviews] Close Reviews Display';

// export const CHECK_BOOK_EXISTS = '[Book Reviews] Check Book Exists';
export const CREATE_BOOK = '[Book Reviews] Create Book';
export const ADD_REVIEW = '[Book Reviews] Add Review';


export class getBookReviews implements Action {
    readonly type = GET_BOOK_REVIEWS; 

    constructor(public payload: string) {}
}


export class resBookReviews implements Action {
    readonly type = RES_BOOK_REVIEWS;

    constructor(public payload: Recommendation[]) {}
}


export class closeReviewsDisplay implements Action {
    readonly type = CLOSE_REVIEWS_DISPLAY;

}


// export class checkBookExists implements Action {
//     readonly type = CHECK_BOOK_EXISTS;

//     constructor(public payload: string) {}
// }


// export class createBook implements Action {
//     readonly type = CREATE_BOOK;

//     constructor(public payload: Books) {debugger}
// }


export class addReview implements Action {
    readonly type = ADD_REVIEW;

    //constructor(public payload: Recommendation) {debugger}
    constructor(public payload: Recommendation) {debugger}
}


export type BookReviewsActions = getBookReviews |
                                 resBookReviews | 
                                 closeReviewsDisplay | 
                                //  checkBookExists |
                                //  createBook |
                                 addReview;