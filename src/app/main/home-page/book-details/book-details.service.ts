import { Recommendation } from './../../../shared/recommendation.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Variables } from 'src/app/shared/variables';
import { map, tap } from "rxjs/operators";
import { pipe } from 'rxjs';
import { Books } from 'src/app/shared/books.model';
import { SharedVariables } from './shared-BookDetails/Shared_variables';


@Injectable({
  providedIn: 'root'
})
export class BookDetailsService {

  // private existBookID: string = '';

  constructor(private http: HttpClient, private variables: Variables, private sharedVaribles: SharedVariables) { }


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


  public creatBook(newBook: Books) {

    return this.http.post(this.variables.FirebaseDB + `Books.json`,newBook);
  }


  public addReview(bookReviews) {
    
    this.http.post(this.variables.FirebaseDB + `Books/${this.sharedVaribles.existBookID}/recommendation.json`,bookReviews).subscribe(res => {
            console.log(res);
      });
  }


  public getBookReviews(bookID: string) {
    
    let reco;
    return this.http.get<Recommendation[]>(this.variables.FirebaseDB + `Books.json?orderBy="_bookID"&equalTo="${bookID}"&print=pretty`)
                    .pipe(
                      map((bookReco: any) => {
                        reco = Object.values(bookReco);
                        return Object.values(reco[0].recommendation);
                      })
                    )
                    .toPromise();
  }
    
    // /49809560.json?orderBy="properties/ZCTA5CE10"&equalTo="02818"&print=pretty
    
    // this.http.post(this.variables.FirebaseDB + `Books/${x}/recommendation.json`,Books).subscribe(response => {
    //   console.log(response);
    // });

    // this.http.put(this.variables.FirebaseDB + `Books/${x}/recommendation.json`,Books).subscribe(response => {
    //   console.log(response);
    // });

    // this.http.get(this.variables.FirebaseDB + `Books/`+ x+ '/recommendation.json').subscribe(response => {
    //   console.log(response);
    // });

    
//     this.db.list(`/Books/${x}`).valueChanges()
//     .pipe(map(snapshots => {
//       return snapshots.map(snap => {
//         return snap;
//       });
//     })).subscribe(res => {
//       console.log(res);
//     });

    // return this.db.list(`/Books/${x}`,ref => ref.orderByKey()).snapshotChanges()
    // .pipe(tap(snapshot=> { 
    //   return snapshot.map(snap => {
    //     return snap.payload.val();
    //   });
    // })).subscribe(res=> {
    //   console.log(res)
    // });
    
  

}
