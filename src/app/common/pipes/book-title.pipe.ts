import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bookTitle'
})
export class BookTitlePipe implements PipeTransform {

  transform(value: any, numCharckters: number): any {
    if(value.length > numCharckters) {
      return value.substr(0,numCharckters) + ' ...' ;
    }
    return value;
  }

}
