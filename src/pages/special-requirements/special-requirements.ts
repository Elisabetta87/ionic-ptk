import { CleaningOverviewPage } from './../cleaning-overview/cleaning-overview';
import { SecureStorage } from 'ionic-native/dist/es5/index';
import { NavController, NavParams } from 'ionic-angular/index';
import { Component } from '@angular/core';


@Component({
    selector: 'requirements-page',
    templateUrl: 'special-requirements.html'
})


export class SpecialRequirementsPage {

    private isStorageReady: boolean;
    private jobId: number;
    private id: number;

    constructor(
        private navCtrl: NavController,
        private storage: SecureStorage,
        private navParams: NavParams
    ) {
        this.jobId = this.navParams.get('jobId');
        this.id = this.navParams.get('id');
        this.storage = new SecureStorage();
    }

    send() {
      this.storage = new SecureStorage();
      this.storage.create('ptkStorage').then(
          ready => {
              this.isStorageReady = true;
              if(this.isStorageReady) {
                this.storage.get('checklist-'+this.id).then(
                data => {
                    let obj = JSON.parse(data);
                    obj.stage = '3.4';
                    data = JSON.stringify(obj);
                    this.storage.set('checklist-'+this.id, data);
                    this.navCtrl.popTo(CleaningOverviewPage);
                },
                error => console.log(error)
                )
            }
          }
      );
    }


}