import { Component } from '@angular/core';
import { SecureStorage } from 'ionic-native/dist/es5/index';
import { NavController } from 'ionic-angular/index';
import { LogInPage } from '../log-in/log-in';
import { JobsListPage } from '../jobs-list/jobs-list';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [SecureStorage]
})
export class HomePage {

  tab1Root = JobsListPage;
  tab2Root = LogInPage;
  tab3Root = LogInPage;


  logInfo: string;

  constructor(
    public navCtrl: NavController,
    private storage: SecureStorage
  ) {
    this.storage = new SecureStorage();
    this.storage.create('logInfo');
    this.storage.get('logInfo')
      .then(
          data => {
            console.log(data);
            let logInfoStorage = JSON.parse(data);
            console.log(logInfoStorage, logInfoStorage['logId'], logInfoStorage['guestId']);
             if (logInfoStorage['logId']) {
                  this.logInfo = 'Registered';
             } else if (logInfoStorage['guestId']) {
                  this.logInfo = 'Logged In As Guest';
             } else if (logInfoStorage == null ) {
                  this.navCtrl.setRoot(LogInPage);
             }
          },
          error => {
            console.log(error);

          }
        )

  }

  linkToJobsList() {
    this.navCtrl.setRoot(JobsListPage);
  }


}

