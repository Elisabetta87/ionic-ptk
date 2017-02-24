import { ChecklistStatusPage } from './../checklist-status/checklist-status';
import { SecureStorage } from 'ionic-native';
import { NavController, NavParams } from 'ionic-angular/index';
import { Component } from '@angular/core';


@Component({
    selector: 'rubbish-page',
    templateUrl: 'rubbish-info.html'
})

export class RubbishInfoPage {

    private jobId: number;
    private isStorageReady: boolean;

    constructor(
        private navCtrl: NavController,
        private storage: SecureStorage,
        private navParams: NavParams
    ){
       this.jobId = this.navParams.get('jobId');
       console.log(this.navParams.get('jobId'), 'ciao');
       this.storage = new SecureStorage();
    }



    send() {
        console.log(this.jobId);
      this.storage = new SecureStorage();
      this.storage.create('rubbish').then(
          ready => {
              this.isStorageReady = true;
              if(this.isStorageReady) {
                this.storage.get('checklistStage-job-'+this.jobId).then(
                data => {
                    let obj = JSON.parse(data);
                    obj.status = 3.3;
                    data = JSON.stringify(obj);
                    this.storage.set('checklistStage-job-'+this.jobId, data);
                    this.navCtrl.popTo(ChecklistStatusPage);
                },
                error => console.log(error)
                )
            }
          }
      );
    }
}