import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterEntries'
})
export class FilterEntriesPipe implements PipeTransform {

  transform(value: any, input: any): any {
    if (input) {
      return value.filter((val: any) => val.title.toLowerCase().indexOf(input.toLowerCase()) >= 0)
    } else {
      return value;
    }
  }

}
