//import { TabsPage } from './../tabs/tabs';
import { MenuService } from './../../services/menu';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular/index';
import { LogInPage } from '../log-in/log-in';
import { GuestEntryPage } from '../guest-entry/guest-entry';


@Component({
  selector: 'page-home-guest',
  templateUrl: 'home-guest.html'
})
export class HomePageGuest {

  private checklist: boolean;
  private job: Object;

  constructor(
         public navCtrl: NavController,
      private navParams: NavParams,
    private menuService: MenuService
  ) {
    this.checklist = true;

    this.job = this.navParams.get('job');
    console.log(this.job);
  }

  ionViewDidEnter() {
    this.menuService.hideMenu();
  }

  accept() {
    this.navCtrl.push(GuestEntryPage, {job: this.job});
  }

  discard() {
    this.navCtrl.setRoot(LogInPage);
  }




}
