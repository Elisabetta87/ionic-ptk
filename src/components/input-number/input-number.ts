import { Component, Output, EventEmitter } from '@angular/core';




@Component({
  selector: 'input-number',
  templateUrl: 'input-number.html'
})


export class InputNumber {

  @Output() notifyNumber: EventEmitter<any> = new EventEmitter<any>();
  private number: number = 1;

  constructor(
  ) {}

  increase(e) {
    e.preventDefault();
    this.number += this.number === 20 ? 0 : 1;
    this.notifyNumber.emit(this.number);
  }

  decrease(e) {
    e.preventDefault();
    this.number -= this.number ? 1 : 0;
    this.notifyNumber.emit(this.number);
  }

  
 
}

