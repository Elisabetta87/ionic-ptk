import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { LogInPage } from '../pages/log-in/log-in';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LogInPage;


  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform

  ) {

    // used for an example of ngFor and navigation
    /*this.pages = [
      { title: 'Home Page', component: HomePage },
      { title: 'Checklist', component: JobsListPage }
    ];*/

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
    this.nav.setRoot(page.component);

  }
}


