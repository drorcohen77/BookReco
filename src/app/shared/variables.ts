import { Books } from './books.model';

export class Variables {

    public readonly FirebaseDB: string = 'https://booksreco.firebaseio.com/';
    public readonly booksAPIkey: string = '&key=AIzaSyCZbC9_a1JhJYIoMkVTSFk2HGsEJFWYaWk';
    public readonly noPic: string = 'assets/images/no_images.png';
    public readonly isMobile: Boolean = window.innerWidth < 768;
    public readonly url: string = 'https://www.googleapis.com/books/v1/volumes?q='; 
    public bookList: Books[];
    public errorCode: number;
    public LoadSpiner: Boolean = false;
}