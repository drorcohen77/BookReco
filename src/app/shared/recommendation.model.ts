import { Books } from 'src/app/shared/books.model';


export class Recommendation {
   
    _reviewID: string;
    // title:string;
    name: string;
    createDate: string;
    review: string
    recommend: number;
    book: Books;
}