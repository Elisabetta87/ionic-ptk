import { TabsPage } from './../tabs/tabs';
import { MenuService } from './../../services/menu';
import { Component } from '@angular/core';
import { SecureStorage } from 'ionic-native/dist/es5/index';
import { NavController } from 'ionic-angular/index';
import { LogInPage } from '../log-in/log-in';
import { GuestEntryPage } from '../guest-entry/guest-entry';


@Component({
  selector: 'page-home-guest',
  templateUrl: 'home-guest.html',
  providers: [SecureStorage]
})
export class HomePageGuest {

  private checklist: boolean;

  constructor(
    public navCtrl: NavController,
    private storage: SecureStorage,
    private menuService: MenuService
  ) {
    this.storage = new SecureStorage();
    this.storage.create('logInfo');
    //set storage with new info home guest
    this.checklist = true;
  }

  ionViewDidEnter() {
    this.menuService.hideMenu();
    console.log('ciao');
  }

  accept() {
    this.navCtrl.setRoot(GuestEntryPage);
  }

  discard() {
    this.navCtrl.setRoot(LogInPage);
  }

}
