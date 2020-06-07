import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from "rxjs/operators";
import { pipe } from 'rxjs';
import { Store } from '@ngrx/store';

import { Recommendation } from './../../../shared/recommendation.model';
import { Variables } from 'src/app/shared/variables';
import { Books } from 'src/app/shared/books.model';
import { SharedVariables } from './shared-BookDetails/Shared_variables';
import * as BookReveiwsActions from '../book-details/store/book-reviews.actions';


@Injectable({
  providedIn: 'root'
})
export class BookDetailsService {

  // private existBookID: string = '';

  constructor(private http: HttpClient, 
              private variables: Variables, 
              private sharedVaribles: SharedVariables) { }


  public checkBook(BookId: string) {

    return this.http.get(this.variables.FirebaseDB + `Books.json?orderBy="_bookID"&equalTo="${BookId}"&print=pretty`);

              // .subscribe(response => {
              //   this.existBookID = Object.keys(response).toString();
              //   console.log(this.existBookID)
                // if(Object.keys(response).length != 0) {
                  
                //   this.http.post(this.variables.FirebaseDB + `Books/${Object.keys(response)}/recommendation.json`,Books.recommendation).subscribe(res => {
                //       console.log(res);
                //     });
                // }
                // else {
                //   this.http.post(this.variables.FirebaseDB + `Books.json`,Books).subscribe(res => {
                //     console.log(res);
                //   });
                // }
    // });

  }


  // public creatBook(newBook: Books) {

  //   return this.http.post(this.variables.FirebaseDB + `Books.json`,newBook);
  // }


  // public addReview(bookReviews) {
    
  //   this.http.post(this.variables.FirebaseDB + `Books/${this.sharedVaribles.existBookID}/recommendation.json`,bookReviews).subscribe(res => {
  //           console.log(res);
  //     });
  // }


  // public getBookReviews(bookID: string) {
    
  //   let reco;
  //   return this.http.get<Recommendation[]>(this.variables.FirebaseDB + `Books.json?orderBy="_bookID"&equalTo="${bookID}"&print=pretty`)
  //                   .pipe(
  //                     map((bookReco: any) => {
  //                       reco = Object.values(bookReco);

  //                       if (reco.length === 0) {
  //                           return false;
  //                       } else if (reco[0].recommendation === undefined) {
  //                           return reco[0].recommendation;
  //                       } else {
  //                           return Object.values(reco[0].recommendation);
  //                       }
  //                     }),
  //                     tap((res: any) => {
  //                       this.store.dispatch(
  //                         new BookReveiwsActions.getBookReviews(bookID)
  //                       );
  //                     })
  //                   )
  //                   .toPromise();
  // }

}
