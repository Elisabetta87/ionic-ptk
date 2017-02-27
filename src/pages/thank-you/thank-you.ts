import { Component } from '@angular/core';
import {SecureStorage} from "ionic-native/dist/es5/index";
import {NavController} from "ionic-angular/index";
import {HomePage} from "../home/home";



@Component({
  selector: 'thank-you',
  templateUrl: 'thank-you.html',
  providers: [SecureStorage]
})

export class ThankYouPage {

  constructor (
    public navCtrl: NavController,
    private storage: SecureStorage
  ) {
    this.storage = new SecureStorage();
    this.storage.create('ptkStorage')
      .then(
        () => console.log('Storage is ready!'),
        error => console.log(error)
      );
  }

  returnHomePage() {
    this.navCtrl.setRoot(HomePage);
  }
}
