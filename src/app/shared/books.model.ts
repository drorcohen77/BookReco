import { Recommendation } from 'src/app/shared/recommendation.model';

export class Books {

    public _bookID: string;
    public title: string;
    public author: string;
    public publisher: string;
    public publishedDate: string;
    public description: string;
    public pageCount: number;
    public categories: string;
    public imageLinks: string;
    public language: string;
    // public recommendation: Recommendation[] =  [];
    public recommendation: Recommendation[];
} 