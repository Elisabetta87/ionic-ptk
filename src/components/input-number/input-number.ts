import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';



@Component({
  selector: 'input-number',
  templateUrl: 'input-number.html',
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputNumber),
      multi: true
    }
  ]
})


export class InputNumber implements ControlValueAccessor{

  private number: number = 1;
  private propagateChange = (_:any) => {};

  constructor(
  ) {}

  increase(e) {
    e.preventDefault();
    this.number += this.number === 20 ? 0 : 1;
    this.propagateChange(this.number);
  }

  decrease(e) {
    e.preventDefault();
    this.number -= this.number ? 1 : 0;
    this.propagateChange(this.number);
  }

  writeValue(value: any): void{
    this.number = value || 1;
  }

  registerOnChange(fn: any): void{
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void{
    
  }
 
}

