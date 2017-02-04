import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'property-form',
  templateUrl: 'property-form.html'
})

export class PropertyForm implements OnInit {

  propertyForm: FormGroup;

  ngOnInit(){
      this.propertyForm = new FormGroup({
        address: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
        city: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
        postcode: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]{1,2}(\\d[a-zA-Z]|[\\d]{2})\\s*\\d[a-zA-Z]{2}$')])),
        dirtyLinen: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])),
        cleanLinen: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')]))
      });



  }


  onSubmit() {
    console.log(this.propertyForm);
  };


}
