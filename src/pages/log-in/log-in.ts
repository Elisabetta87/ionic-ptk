import { Component } from '@angular/core';
import { SecureStorage } from 'ionic-native/dist/es5/index';


@Component({
  selector: 'page-log-in',
  templateUrl: 'log-in.html',
  providers: [SecureStorage]
})
export class LogInPage {


}
