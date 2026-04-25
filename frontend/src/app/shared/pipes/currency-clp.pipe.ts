import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyClp'
})
export class CurrencyClpPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
