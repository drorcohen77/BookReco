import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient} from '@angular/common/http';
import { map } from "rxjs/operators";
import { BehaviorSubject } from 'rxjs';

import { Books } from './../../shared/books.model';
import { Variables } from './../../shared/variables';




@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  private readonly _book = new BehaviorSubject<string>(null);
  readonly bookID$ = this._book.asObservable();
  private books: Books[] = []; 
  public Exist_Book: boolean;
  public sharedVaribles: any;
  public fromCreateNewBook: boolean = false; // to know if the user got to new crate book page or book details page

  constructor(
    private variables: Variables, 
    private http: HttpClient, 
    private db: AngularFireDatabase, 
    private DB: AngularFirestore, 
    // private store: Store<fromApp.AppState > 
    ) { }


  public existBook(title: string, author: string) {

    this.Exist_Book = false;

    return this.http
      .get<Books[]>(this.variables.FirebaseDB + `Books.json`)
      .pipe(
        map((bookReco: any) => {
          let books: Books[] = Object.values(bookReco);
          let booksIndex: Array<string> = Object.keys(bookReco);
          let bookID:string = '';
          
          books.forEach((book,index) => {
            if (book.title.indexOf(title) !== -1 && (book.author == undefined || book.author[0].indexOf(author) !== -1)){
              this.Exist_Book = true;
              bookID = booksIndex[index];
              this._book.next(bookID);
            }//needs to write error message
          });
          return bookID;
        })
    )
    .toPromise();
  }

}
