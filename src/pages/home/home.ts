import { Component } from '@angular/core';
//import {Diagnostic} from 'ionic-native';
//import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor() {
    // testing Diagnostic
    /*let successCallback = (isAvailable) => { console.log('Is available? ' + isAvailable); };
     let errorCallback = (e) => console.error(e);

     //Diagnostic.isCameraAvailable().then(successCallback).catch(errorCallback);

     Diagnostic.isLocationAvailable().then(successCallback, errorCallback);
*/
     /*Diagnostic.getLocationMode()
     .then((state) => {
     if (state == Diagnostic.locationMode.LOCATION_OFF){
     this.showAlert();
     } else {
     // do something else
     }
     }).catch(e => console.error(e));
     }*/




     /*showAlert() {
     let alert = this.alertCtrl.create({
     title: 'GPS IS REQUIRED',
     subTitle: 'Please enable your GPS!',
     buttons: ['OK']
     });
     alert.present();*/

  }
}
