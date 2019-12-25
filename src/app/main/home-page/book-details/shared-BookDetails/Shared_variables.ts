import { Recommendation } from 'src/app/shared/recommendation.model';
import { Books } from 'src/app/shared/books.model';

export class SharedVariables {
 
  public addRevieButton: boolean = false;
  public reviewButton: boolean = false;
  // public reviews: Recommendation[] = [];
  public reviews: Recommendation;
  public bookReviews: Books;
  public bookID: string;
  public existBookID: string = '';
}