import { Action } from '@ngrx/store';
import { Recommendation } from 'src/app/shared/recommendation.model';
import * as BookReviewsActions from './book-reviews.actions';


export interface State {
    bookReviews: Recommendation[];
    loadSpiner: boolean;
    closeReviews: boolean;
}

const initialBookReviewsState = {
    bookReviews: null,
    loadSpiner: null,
    closeReviews: false
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
                bookReviews: action.payload
            };
        case BookReviewsActions.CLOSE_REVIEWS_DISPLAY:
            return {
                ...state,
                closeReviews:false
            };
        default: 
            return state;
    }
}