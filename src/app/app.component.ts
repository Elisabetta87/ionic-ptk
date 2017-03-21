import { LogInPage } from './../pages/log-in/log-in';
import { StorageST } from './../services/StorageST';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  private date = new Date();

  rootPage; 

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      StorageST.getStorage().subscribe();
      StorageST.get('authToken').subscribe(res => {
        if(res == 'error') {
          this.rootPage = LogInPage;
        } else if(!this.tokenExpired(res)) {
          this.rootPage = TabsPage; 
        } else if(this.tokenExpired(res)) {
          StorageST.remove('authToken').subscribe();
          this.rootPage = LogInPage;
        }
      })
    })
 }

 tokenExpired(res) {
    let tokenCreated = new Date(JSON.parse(res)['currentDate']);
    let OneMonthAfter = tokenCreated.setMonth(tokenCreated.getMonth()+1);
    if(+this.date >= +OneMonthAfter) {
      return true;
    } else {
      return false;
    }
 }

}
