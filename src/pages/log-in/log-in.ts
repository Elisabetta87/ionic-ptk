import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
//import { SecureStorage } from 'ionic-native/dist/es5/index';
import {NavController} from "ionic-angular/index";


@Component({
  selector: 'page-log-in',
  templateUrl: 'log-in.html',
  //providers: [SecureStorage]
})
export class LogInPage {

   hasToShowTabs: boolean = false;
   tabBarElement: any;

  constructor(
    public navCtrl: NavController
  ){
    //this.tabBarElement = document.querySelector('#tabs .tabbar.show-tabbar');

  }

 ionViewDidEnter() {
        console.log('Has to show tabs: ' + this.hasToShowTabs);
        document.getElementsByClassName('tab-button')[0]['style'].display = 'none';
        document.querySelector('.tabbar.show-tabbar')['style'].display = this.hasToShowTabs ? 'flex' : 'none';
        
        if( !this.hasToShowTabs ){
            document.getElementsByClassName('scroll-content')[1]['style'].marginBottom = '0px';
            document.getElementsByClassName('fixed-content')[1]['style'].marginBottom = '0px';
        }
 }
 ionViewDidLeave() {
   this.hasToShowTabs = true;
   console.log('Has to show tabs: ' + this.hasToShowTabs);
   document.getElementsByClassName('tab-button')[0]['style'].display = 'none';
        document.querySelector('.tabbar.show-tabbar')['style'].display = this.hasToShowTabs ? 'flex' : 'none';
        
        if( !this.hasToShowTabs ){
            document.getElementsByClassName('scroll-content')[1]['style'].marginBottom = '0px';
            document.getElementsByClassName('fixed-content')[1]['style'].marginBottom = '0px';
        }
 }


  
}
