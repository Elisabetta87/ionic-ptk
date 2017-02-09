import { Component } from '@angular/core';
import {SecureStorage} from "ionic-native/dist/es5/index";
import {NavController} from "ionic-angular/index";


@Component({
  selector: 'page-home-guest',
  templateUrl: 'home-guest.html',
  providers: [SecureStorage]
})
export class HomePageGuest {

  private checklist: boolean;

  constructor(
    public navCtrl: NavController,
    private storage: SecureStorage
  ) {
    this.storage = new SecureStorage();
    this.storage.create('logInfo');
    //set storage with new info home guest
    this.checklist = false;
  }


}

