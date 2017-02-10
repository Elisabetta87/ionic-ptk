import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular/index';
import { ChecklistPage } from '../checklist/checklist';

@Component({
  selector: 'page-job-details',
  templateUrl: 'job-details.html'
})
export class JobDetailsPage {
  /*set lat and lng for google map */
  lat: number = 51.5269772;
  lng: number = -0.0905013;

  private id: number;
  private address: string;
  private service: string;

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams
  ) {

    this.address = navParams.get('address');
    this.service = navParams.get('service');
    this.id = navParams.get('id');
  }

  completeChecklist() {
    this.navCtrl.push(ChecklistPage, {
      id: this.id
    });
  }

}

