import { SecureStorage } from 'ionic-native/dist/es5/index';
import { Component } from '@angular/core';
import {NavController} from "ionic-angular/index";
import {LogInPage} from "../log-in/log-in";




@Component({
  selector: 'page-more',
  templateUrl: 'more.html'
})
export class MorePage {

  private isStorageReady: boolean;

  constructor(
    public navCtrl: NavController,
    private storage: SecureStorage
  ) { 
    this.storage = new SecureStorage();
    this.storage.create('logIn').then(resp => this.isStorageReady = true);
  }


  logOut() {
    if (this.isStorageReady) {
        this.storage.remove('authToken').then(
          resp =>  {console.log('token deleted'); this.navCtrl.setRoot(LogInPage)}
        );
    }
  }
}

