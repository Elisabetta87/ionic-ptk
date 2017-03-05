import { JobsListPage } from './../jobs-list/jobs-list';
import { MenuService } from './../../services/menu';
import { Component } from '@angular/core';
import { SecureStorage } from 'ionic-native/dist/es5/index';
import {NavController} from "ionic-angular/index";


@Component({
  selector: 'page-log-in',
  templateUrl: 'log-in.html',
  providers: [SecureStorage]
})
export class LogInPage {

  private isStorageReady:boolean;

  constructor(
    public navCtrl: NavController,
    private menuService: MenuService,
    private storage: SecureStorage
  ){
    this.storage = new SecureStorage();
    this.storage.create('ptkStorage').then(res=>this.isStorageReady=true);
  }


  ionViewDidEnter() {
    if(this.isStorageReady) {
      this.storage.get('user_id').then(user_id => {
        console.log(user_id);
        this.menuService.displayMenu();
        this.navCtrl.push(JobsListPage, {id: +user_id});
      },
      error => this.menuService.hideMenu()
      );
    }   
  }
  
}
