import { Component } from '@angular/core';
import { NavController } from 'ionic-angular/index';
import {JobDetailsPage} from "../job-details/job-details";



@Component({
  selector: 'page-guest-entry',
  templateUrl: 'guest-entry.html',
})
export class GuestEntryPage {


  constructor(
    public navCtrl: NavController
  ) {

  }


  moveToJobDetails() {
    this.navCtrl.setRoot(JobDetailsPage);
  }

}


