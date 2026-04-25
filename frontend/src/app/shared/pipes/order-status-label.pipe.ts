import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderStatusLabel'
})
export class OrderStatusLabelPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
