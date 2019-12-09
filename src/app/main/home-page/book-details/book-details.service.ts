import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Variables } from 'src/app/shared/variables';


@Injectable({
  providedIn: 'root'
})
export class BookDetailsService {

  constructor(private http: HttpClient, private variables: Variables) { }


  public addReview(review: any) {
    
    let test = {name: 'test', pass: 'test'}
    console.log(review)
    console.log(this.variables.FirebaseDB + 'test.json')
    this.http.post(this.variables.FirebaseDB + 'review.json', review).subscribe(response => {
      console.log(response);
    })
  }

}
