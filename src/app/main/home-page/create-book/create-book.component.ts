import { Component, OnInit } from '@angular/core';
import { Books } from 'src/app/shared/books.model';
import { Router } from '@angular/router';
import { HomePageService } from '../home-page.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';


@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.sass']
})
export class CreateBookComponent implements OnInit {

  public newBook: Books;
  public bookExist: any;
  public reviewInStorage: any;


  constructor(private HomePageService: HomePageService, private nav: Router, private modalService: NgbModal, private toastr: ToastrService) { 
    
    this.reviewInStorage = JSON.parse(localStorage.getItem('new_review'));
    this.newBook = new Books;
  }

  ngOnInit() {

  }


  public onCreateBook(moveToReview)  {
     
    let newPublishDate = moment(this.newBook.publishedDate).format('DD/MM/YYYY');
    this.newBook = {...this.newBook, publishedDate: newPublishDate};

    if (this.reviewInStorage) {
      this.newBook = {...this.newBook, title: this.reviewInStorage.title};
    }
    
    this.HomePageService.createBook(this.newBook).then(
      (book: any) =>{
        this.bookExist = book;
        if (localStorage.getItem('new_review')) {
          this.toastr.success('Your Book Has Been Successfuly Added!')
          this.nav.navigate(['/home/booklist']);
        } else {
          localStorage.setItem('new_book', JSON.stringify(this.newBook));
          this.modalService.open(moveToReview);
        }
        localStorage.removeItem('new_review');
      } 
    );
  }

}
