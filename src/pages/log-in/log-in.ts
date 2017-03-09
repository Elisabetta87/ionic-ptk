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
    console.log(StorageST.getKeys()); 
  }

  ionViewWillEnter() {
    this.platform.ready().then(() => {
      console.log(StorageST.getKeys());
      if(StorageST.getKeys() !== undefined  && StorageST.getKeys().indexOf('user_id') !== -1) {
        StorageST.get('user_id').subscribe(user_id => {
          console.log(user_id);
          this.navCtrl.push(JobsListPage, {id: +user_id});
        })
      }
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