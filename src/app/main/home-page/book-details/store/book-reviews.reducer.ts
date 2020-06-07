import { Action } from '@ngrx/store';
import { Recommendation } from 'src/app/shared/recommendation.model';
import * as BookReviewsActions from './book-reviews.actions';
import { Books } from 'src/app/shared/books.model';


export interface State {
    bookReviews: Recommendation[];
    loadSpiner: boolean;
    closeReviews: boolean;
    // bookExists: string;
    // newBook: Books;
    // newReview: Recommendation;
}

const initialBookReviewsState = {
    bookReviews: null,
    loadSpiner: null,
    closeReviews: false,
    // bookExists: null,
    // newBook: null,
    // newReview: null
}


export function BookReviewsReducer (state = initialBookReviewsState, action: BookReviewsActions.BookReviewsActions) {
    switch(action.type) {
        case BookReviewsActions.GET_BOOK_REVIEWS:
            return {
                ...state,
                loadSpiner: true,
                closeReviews:true 
                //needs to be returned because closeReviews property was initiated with valus true 
                //from bookDetailsComponent.ts and has condition in line 57 in bookDetailsComponent.html
            };
        case BookReviewsActions.RES_BOOK_REVIEWS:
            return {
                ...state,
                loadSpiner: false,
                // closeReviews:true,
                bookReviews: action.payload
            };
        case BookReviewsActions.CLOSE_REVIEWS_DISPLAY:
            return {
                ...state,
                // loadSpiner: false,
                closeReviews:false
            };
        // case BookReviewsActions.CHECK_BOOK_EXISTS:
        //     debugger
        //     return {
        //         ...state,
        //         bookExists: action.payload
        //     };
        // case BookReviewsActions.CREATE_BOOK:
        //     debugger
        //     return {
        //         ...state,
        //         newBook: action.payload 
        //     };
        // case BookReviewsActions.ADD_REVIEW:
        //     return {
        //         ...state,
        //         newReview: action.payload 
        //     };
        default: 
            return state;
    }
}