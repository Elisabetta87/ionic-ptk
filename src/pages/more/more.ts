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


  logOut() {
    let storageKeys = StorageST.getKeys();
    console.log(storageKeys);
    for(let i=0; i<storageKeys.length; i++) {
      StorageST.remove(storageKeys[i]).subscribe();
    } 
    this.navCtrl.setRoot(LogInPage); 
  }
}

