import { Component } from '@angular/core';
import { SecureStorage } from 'ionic-native/dist/es5/index';
import { NavController } from 'ionic-angular/index';
import {PropertyDetailsPage} from "../property-details/property-details";
import {ThankYouPage} from "../thank-you/thank-you";


@Component({
  selector: 'page-property',
  templateUrl: 'property.html',
  providers: [SecureStorage]
})
export class PropertyPage {

  constructor (
    public  navCtrl: NavController,
    private storage: SecureStorage
  ) {
    this.storage = new SecureStorage();
    this.storage.create('form');
    this.storage.get('firstForm')
        .then(
          data => {
            let formStorage = JSON.parse(data);
            if (formStorage['stage'] == 2) {
              this.navCtrl.setRoot(PropertyDetailsPage);
            } else if (formStorage['stage'] == 3) {
              this.navCtrl.setRoot(ThankYouPage);
            } else if (formStorage == null ) {
              console.log('stage 1');
            }
          },
          error => {
            console.log(error);
          }
        )
  }

}
