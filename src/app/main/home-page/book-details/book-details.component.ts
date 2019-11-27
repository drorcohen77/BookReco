import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  public bookId: string = ''

  constructor(private rout: ActivatedRoute) { }

  ngOnInit() {
    
    this.bookId = this.rout.snapshot.queryParams['book-id'];
    console.log(this.bookId)
  }

}
