import { Component } from '@angular/core';
//import { SecureStorage } from 'ionic-native/dist/es5/index';
import {NavController} from "ionic-angular/index";


@Component({
  selector: 'page-log-in',
  templateUrl: 'log-in.html',
  //providers: [SecureStorage]
})
export class LogInPage {

  constructor(
    public navCtrl: NavController
  ){}
  
}
