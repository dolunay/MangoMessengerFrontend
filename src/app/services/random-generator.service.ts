import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomGeneratorService {

  constructor() {
  }

  test(): void {
    const array = new Uint32Array(10);
    window.crypto.getRandomValues(array);

    console.log("Ваше счастливое число:");

    for (let i = 0; i < array.length; i++) {
      console.log(array[i]);
    }
  }
}
