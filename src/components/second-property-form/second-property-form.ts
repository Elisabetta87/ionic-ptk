import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {SecureStorage} from 'ionic-native';





@Component({
  selector: 'second-property-form',
  templateUrl: 'second-property-form.html'
})

export class SecondFormComponent implements OnInit {

  public secondPropertyForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private storage: SecureStorage
  ) {
    this.storage = new SecureStorage();
    this.storage.create('form');
  }

  ngOnInit() {
    this.secondPropertyForm = this.fb.group({
      keys: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      bedsMade: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
      cleanLinenLeft: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]
    });

  }


  onSubmit() {
    let keyStorage = 'firstForm';
    this.storage.get(keyStorage)
      .then(data => {
        let formStorage = JSON.parse(data);
        formStorage['stage'] = 3;
        for(let index in this.secondPropertyForm.controls){
          formStorage[index] = this.secondPropertyForm.controls[index].value;
        }
        this.storage.set(keyStorage, JSON.stringify(formStorage));
      });
  }

}
