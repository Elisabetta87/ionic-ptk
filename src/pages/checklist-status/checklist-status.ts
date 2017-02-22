import { SecureStorage } from 'ionic-native';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular/index';
import {ChecklistPage} from "../checklist/checklist";



@Component({
  selector: 'page-checklist-status',
  templateUrl: 'checklist-status.html'
})
export class ChecklistStatusPage {

  private id: number;
  private jobId: number;
  private services: string;
  private greenBar: string;
  private checklistObj: Object;
  private isStorageReady: boolean;
  private enableTickStatusTwo: boolean;

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private storage: SecureStorage
  ) {

    this.id = navParams.get('id');
    this.jobId = navParams.get('jobId');
    this.services = navParams.get('services');
    this.checklistObj = navParams.get('checklistObj');
    this.greenBar = this.id ? 'greenBar' : '';
    this.storage = new SecureStorage();
    this.storage.create('status').then(
      () => this.isStorageReady = true);
  }


  ionViewWillEnter() {
    if(this.isStorageReady) {
        this.storage.get('checklistStage-job-'+this.jobId).then(
          res => {
            //I need a switch statement to check status
            // switch (key) {
            //   case value:
                
            //     break;
            
            //   default:
            //     break;
            // }
            console.log(res);
            this.enableTickStatusTwo = true;//(res.status == undefined) ? false : true;
            //console.log(this.enableTickStatusTwo);
          },
          error => {
            console.log(error);
            //this.enableTickStatusTwo = false;
          }
          );
    }
  }



  checklist() {
    this.navCtrl.push(ChecklistPage, {
     id: this.id,
     jobId: this.jobId,
     checklistObj: this.checklistObj
     });
  }

  completeChecklist() {
    /*this.navCtrl.push(ChecklistPage, {
     id: this.id
     });*/

  }


}
