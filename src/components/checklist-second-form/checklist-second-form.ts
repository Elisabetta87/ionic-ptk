import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SecureStorage } from 'ionic-native';
import { NavController, NavParams } from 'ionic-angular/index';
import { ThankYouPage } from "../../pages/thank-you/thank-you";





@Component({
  selector: 'checklist-second-form',
  templateUrl: 'checklist-second-form.html'
})

export class SecondFormComponent implements OnInit {

  private id: string;
  public secondPropertyForm: FormGroup;

  constructor(
    public    navCtrl: NavController,
    private        fb: FormBuilder,
    private   storage: SecureStorage,
    private navParams: NavParams
  ) {
    this.id = navParams.get('id');
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
    let keyStorage = 'checklist-'+this.id;
    this.storage.get(keyStorage)
      .then(data => {
        let formStorage = JSON.parse(data);
        formStorage['stage'] = 3;
        for(let index in this.secondPropertyForm.controls){
          formStorage[index] = this.secondPropertyForm.controls[index].value;
        }
        this.storage.set(keyStorage, JSON.stringify(formStorage));
        this.navCtrl.setRoot(ThankYouPage);
        console.log(formStorage);
      });
  }

}
