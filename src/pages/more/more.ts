import { InvoicesPage } from './../invoices/invoices';
import { PastJobsPage } from './../jobs-list/past-jobs';
import { StorageST } from './../../services/StorageST';
import { Component } from '@angular/core';
import {NavController, Nav} from "ionic-angular/index";
import {LogInPage} from "../log-in/log-in";




@Component({
  selector: 'page-more',
  templateUrl: 'more.html'
})
export class MorePage {

  constructor(
    public navCtrl: NavController,
    public nav: Nav
  ) {}

  goToPastJobsPage() {
    this.navCtrl.push(PastJobsPage);
  }

  goToInvoicesPage() {
    this.navCtrl.push(InvoicesPage);
  }

  logOut() {
    StorageST.remove('user_id').subscribe(() => {
      StorageST.remove('authToken').subscribe(() => this.nav.setRoot(LogInPage));
    })
     
  }
}

