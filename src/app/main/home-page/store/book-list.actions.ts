import { Action } from '@ngrx/store';
import { Books } from 'src/app/shared/books.model';
import { Recommendation } from 'src/app/shared/recommendation.model';


export const SEARCH_BOOK = '[Book List] SearchBook';
export const RESULT_SEARCH_BOOK = '[Book List] Result Search Book';
export const ERROR_SEARCH_BOOK = '[Book List] Error Search Book';

export const ADD_BOOK = '[Book List] Add New Book';
export const ADD_RECOMMENDATION = '[Book List] Add Recommendations';

export const ADDED_BOOK = '[Book List] Id Of Added Book';


export class SearchBook implements Action {
    readonly type = SEARCH_BOOK;

    constructor(public payload: string) {}
}


export class ResultSearchBook implements Action {

    readonly type = RESULT_SEARCH_BOOK; 

    constructor(public payload: Books[]) {}
}


export class ErrorSearchBook implements Action {

    readonly type = ERROR_SEARCH_BOOK; 

    constructor(public payload: string) {}
}


export class AddBook implements Action {
    readonly type = ADD_BOOK;

    constructor(public payload: Books) {debugger}
}


// export class AddRecommedation implements Action {
//     readonly type = ADD_RECOMMENDATION;

//     constructor(public payload: {bookID: string; newReview: Recommendation}) {debugger}
// }

export class AddedBook implements Action {
    readonly type = ADDED_BOOK;

    constructor(public payload: any) {debugger}
}


export type BookListActions = SearchBook | 
                              ResultSearchBook | 
                              ErrorSearchBook | 
                              AddBook |
                              AddedBook;