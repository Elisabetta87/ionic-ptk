import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import {StatusBar, Splashscreen, SecureStorage} from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { PropertyPage } from '../pages/property/property';
import {PropertyDetailsPage} from "../pages/property-details/property-details";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    private storage: SecureStorage
  ) {
    this.storage = new SecureStorage();
    this.storage.create('form');
    this.initializeApp();
    console.log('constructor');

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home Page', component: HomePage },
      { title: 'Property Page', component: PropertyPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {


      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    console.log('home page');
    this.storage.get('firstForm')
                .then(data => {
                  let stage = JSON.parse(data).stage;
                  if(stage == 2) {
                    this.nav.setRoot(PropertyPage);
                  } else if(stage == 3) {
                    this.nav.setRoot(PropertyDetailsPage);
                  } else {
                    this.nav.setRoot(page.component);
                  }
                });
  }
}


