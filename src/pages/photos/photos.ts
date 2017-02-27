import { ChecklistStatusPage } from './../checklist-status/checklist-status';
import { SecureStorage } from 'ionic-native/dist/es5/index';
import { NavController, NavParams } from 'ionic-angular/index';
import { Component } from '@angular/core';



@Component({
    selector: 'photos-page',
    templateUrl: 'photos.html'
})
export class PhotosPage {

    private isStorageReady: boolean;
    private jobId: number;

    constructor(
        private navCtrl: NavController,
        private storage: SecureStorage,
        private navParams: NavParams
    ) {
      this.jobId = this.navParams.get('jobId');
    }

    send() {
      this.storage = new SecureStorage();
      this.storage.create('ptkStorage').then(
          ready => {
              this.isStorageReady = true;
              if(this.isStorageReady) {
            this.storage.get('checklistStage-job-'+this.jobId).then(
                data => {
                    let obj = JSON.parse(data);
                    obj.status = 3.1;
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



