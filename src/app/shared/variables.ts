import { Books } from './books.model';

export class Variables {

    public readonly FirebaseDB: string = 'https://booksreco.firebaseio.com/';
    public readonly booksAPIkey: string = '&key=AIzaSyCZbC9_a1JhJYIoMkVTSFk2HGsEJFWYaWk';
    // public readonly booksAPIkey: string = '&key=AIzaSyAOZx0bvvsMVYuJ0x3yLe4KnhxXCYFvObA';
    public readonly noPic: string = 'assets/images/no_images.png';
    public readonly isMobile: boolean = window.innerWidth < 768;
    public readonly url: string = 'https://www.googleapis.com/books/v1/volumes?q='; 
    public bookList: Books[];
    public errorCode: number;
    public LoadSpiner: boolean = false;
    public logedIn: boolean = false;
    public createReview: boolean = false;
    public fromCreateNewBook: boolean = false;
    public register: boolean = false; //to udentify registration and not remove 'new-book' in local storage or to remove this local storage when distroying create-book component
}