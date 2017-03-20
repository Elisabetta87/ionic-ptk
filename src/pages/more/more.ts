import { PastJobsPage } from './../jobs-list/past-jobs';
import { StorageST } from './../../services/StorageST';
import { Component } from '@angular/core';
import {NavController} from "ionic-angular/index";
import {LogInPage} from "../log-in/log-in";




@Component({
  selector: 'page-more',
  templateUrl: 'more.html'
})
export class MorePage {

  constructor(
    public navCtrl: NavController
  ) {}

  gotToPastJobsPage() {
    this.navCtrl.push(PastJobsPage);
  }

  logOut() {
    StorageST.remove('user_id').subscribe(() => {
      StorageST.remove('authToken').subscribe(() => this.navCtrl.push(LogInPage))
    })
     
  }
}

