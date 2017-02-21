import { Component } from '@angular/core';
import {NavController} from "ionic-angular/index";
import {SecureStorage} from "ionic-native/dist/es5/index";
import {LogInPage} from "../log-in/log-in";
import { TabsPage } from './../tabs/tabs';




@Component({
  selector: 'page-more',
  templateUrl: 'more.html'
})
export class MorePage {

  constructor(
    public navCtrl: NavController,
    //private storage: SecureStorage
  ) {
    //this.storage = new SecureStorage();
    //this.storage.create('logIn');
  }


  logOut() {
    //this.storage.remove('logInfo');
    this.navCtrl.setRoot(LogInPage);
  }
}

