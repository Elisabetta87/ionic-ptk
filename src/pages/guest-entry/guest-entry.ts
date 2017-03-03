import { SecureStorage } from 'ionic-native';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular/index';
import {JobDetailsPage} from "../job-details/job-details";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'page-guest-entry',
  templateUrl: 'guest-entry.html',
})
export class GuestEntryPage {

  private isStorageReady: boolean;
       private guestForm: FormGroup;
       private job: Object;

  constructor(
      public navCtrl: NavController,
   private navParams: NavParams,
          private fb: FormBuilder,
     private storage: SecureStorage
  ) {
    this.storage = new SecureStorage();
    this.storage.create('ptkStorage').then(res => this.isStorageReady = true);
    this.job = this.navParams.get('job');
  }

  ngOnInit(){ 
    this.guestForm = this.fb.group({
      agent_name: ['', Validators.required]
    });
  }

  onSubmit() {
    if(this.isStorageReady) {
     let body = JSON.stringify(this.guestForm.value['agent_name']);
     console.log(this.guestForm.value['agent_name']);
     this.storage.set('agent_name', JSON.stringify(this.guestForm.value['agent_name'])).then(
       res => {
          this.navCtrl.push(JobDetailsPage, {job: this.job});
       },
       error => console.log(error)
     )
    }
  }

  moveToJobDetails() {

  }


}


