import { Component } from '@angular/core';





@Component({
  selector: 'input-number',
  templateUrl: 'input-number.html'
})


export class InputNumber {

  private number: number = 1;

  constructor(
  ) {}

  increase() {
    this.number += this.number === 20 ? 0 : 1;
  }

  decrease() {
    this.number -= this.number ? 1 : 0;
  }

}

