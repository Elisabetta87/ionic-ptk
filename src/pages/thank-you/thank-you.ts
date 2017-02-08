import { Component } from '@angular/core';
import {SecureStorage} from "ionic-native/dist/es5/index";



@Component({
  selector: 'thank-you',
  templateUrl: 'thank-you.html',
  providers: [SecureStorage]
})

export class ThankYouPage {

  constructor (
    private storage: SecureStorage
  ) {
    this.storage = new SecureStorage();
    this.storage.create('form')
      .then(
        () => console.log('Storage is ready!'),
        error => console.log(error)
      );
  }
}
