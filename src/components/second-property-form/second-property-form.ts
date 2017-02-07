import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {StorageService} from "../../services/storage-service";





@Component({
  selector: 'second-property-form',
  templateUrl: 'second-property-form.html'
})

export class SecondFormComponent implements OnInit {

  public secondPropertyForm: FormGroup;

  constructor(
    private secStorage: StorageService
  ) {}

  ngOnInit() {
    this.secondPropertyForm = new FormGroup({
      keys: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      bedsMade: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])),
      cleanLinenLeft: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')]))
    });

  }


  onSubmit() {
    //console.log(this.secondPropertyForm.value);
    //this.
    //this.secStorage.setStorageItem('firstForm', );
  }

}
