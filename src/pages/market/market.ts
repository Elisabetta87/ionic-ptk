//import { JobsListPage } from './../jobs-list/jobs-list';
import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
//import {NavController} from "ionic-angular/index";




@Component({
  selector: 'page-market',
  templateUrl: 'market.html'
})
export class MarketPage {

  private params_market = {};
  private date: any = new Date();
  private twoWeeksAfter: any =  new Date(+new Date + 12096e5);

  constructor(
    //public navCtrl: NavController,
    //private jobList: JobsListPage
  ) {
    this.date.setDate(this.date.getDate() + 1);
    this.twoWeeksAfter.setDate(this.twoWeeksAfter.getDate() + 1);
  }

  market_jobs() {
    this.params_market = {
      start_date: this.date.toISOString().slice(0, 10),
      end_date: this.twoWeeksAfter.toISOString().slice(0, 10),
      status: 'available,accepted',
      user_id: 31 //|| navParams.get('id')
    }
    return this.params_market;

  }

}

