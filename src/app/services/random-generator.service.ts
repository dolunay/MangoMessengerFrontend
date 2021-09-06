import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomGeneratorService {

  constructor() {
  }

  generateRandomNumber(): number {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0];
  }
}
