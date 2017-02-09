import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular/index';

@Component({
  selector: 'job-details-list',
  templateUrl: 'job-details.html'
})
export class JobDetailsPage {

  private address: string;
  private service: string;

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams
  ) {

    this.address = navParams.get('address');
    this.service = navParams.get('service');
  }



}
