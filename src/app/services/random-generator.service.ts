import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomGeneratorService {

  constructor() {
  }

  getRandomInt(min: number, max: number): number {
    let byteArray = new Uint8Array(1);
    window.crypto.getRandomValues(byteArray);

    let range = max - min + 1;
    let max_range = 256;

    if (byteArray[0] >= Math.floor(max_range / range) * range){
      return this.getRandomInt(min, max);
    }

    return min + (byteArray[0] % range);
  }
}
