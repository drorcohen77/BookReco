import { Action } from '@ngrx/store';
import * as BookListActions from './book-list.actions';
import { Books } from 'src/app/shared/books.model';

export interface State {
    books: Books[];
    booksError: string;
    loadSpiner: boolean;
    book: any;
}


const initialBooksState = {
    books: null,
    booksError: null,
    loadSpiner: false,
    book: null
};


export function BookListReducer(state = initialBooksState, action: BookListActions.BookListActions) {
    switch (action.type) {
        case BookListActions.SEARCH_BOOK://sending http GET request to FIREBASE server 
            
            return {
                    ...state,
                    booksError: null,
                    loadSpiner: true,
                    books: action.payload
                };
        case BookListActions.RESULT_SEARCH_BOOK:// getting results from FIREBASE server
        
            return {
                    ...state,
                    booksError: null,
                    loadSpiner: false,
                    books: [...action.payload]
                };
        case BookListActions.ERROR_SEARCH_BOOK://getting error from Search Books request to FIREBASE server             
            return {
                    ...state,
                    booksError: action.payload,
                    loadSpiner: false
                };
        case BookListActions.ADDED_BOOK:
            
            return {
                ...state,
                book: action.payload
            };
        default:
            return state;
    }
}