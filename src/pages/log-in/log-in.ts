import { StorageST } from './../../services/StorageST';
import { JobsListPage } from './../jobs-list/jobs-list';
import { MenuService } from './../../services/menu';
import { Component } from '@angular/core';
import { NavController, Platform } from "ionic-angular/index";


@Component({
  selector: 'page-log-in',
  templateUrl: 'log-in.html'
})
export class LogInPage {

  constructor(
    public navCtrl: NavController,
    private menuService: MenuService,
    private platform: Platform
  ){}


  ionViewDidEnter() {
    this.menuService.hideMenu(); 
  }

  ionViewWillEnter() {
    this.platform.ready().then(() => {
        StorageST.get('user_id').subscribe(userId => {
          this.navCtrl.push(JobsListPage, {user_id: +userId});
        })
    })

    
  // StorageST.set('number', 23456789)
  //            .subscribe(res => {
  //              console.log('RESULT SET: ', res);
  //            });

  // StorageST.set('number2', 1000009)
  //            .subscribe(res => {
  //              console.log('RESULT SET: ', res);
  //            });           

  // console.log( StorageST.getKeys() );
           

    // if(this.isStorageReady) {
    //   this.storage.get('user_id').then(user_id => {
    //     console.log(user_id);
    //     this.navCtrl.push(JobsListPage, {id: +user_id});
    //   },
    //   error => console.log(error)
    //   );
    // }
  }

}