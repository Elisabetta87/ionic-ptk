import { LogInPage } from './../pages/log-in/log-in';
import { NavController } from 'ionic-angular/index';
import { MarketPage } from './../pages/market/market';
import { JobsListPage } from './../pages/jobs-list/jobs-list';
import { TabsPage } from './../pages/tabs/tabs';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = TabsPage;//LogInPage;


  pages: Array<{title: string, component: any, tabComponent: any}>;

  constructor(
    public platform: Platform
  ) {

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Jobs', component: TabsPage, tabComponent: JobsListPage },
      { title: 'Checklist', component: TabsPage, tabComponent: MarketPage },
      { title: 'Checklist', component: TabsPage, tabComponent: MarketPage},
      { title: 'Checklist', component: TabsPage, tabComponent: MarketPage}
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
    this.nav.setRoot(page.component);
    console.log('DID ENTER', this.nav);
   
  }


  ionViewDidEnter(){
        
      
    }


}


