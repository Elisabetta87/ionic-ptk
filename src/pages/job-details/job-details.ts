import { SecureStorage } from 'ionic-native/dist/es5/index';
import { GetChecklistId } from './../../services/get-checklist-id';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular/index';
import { ChecklistStatusPage } from '../checklist-status/checklist-status';

@Component({
  selector: 'page-job-details',
  templateUrl: 'job-details.html',
  providers: [SecureStorage]
})
export class JobDetailsPage {
  /*set lat and lng for google map */
  property_latitude: number;
  property_longitude: number;

  private jobId: number;
  private address: string;
  private services: string;
  private checklistBody: Object;
  private current_date: Date = new Date();
  private isStorageReady: boolean;
  private button_txt: string;
  private date: string;
  private time: string;
  private platform_ready: boolean;

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private storage: SecureStorage,
    private getChecklistId: GetChecklistId,
    private platform: Platform
  ) {
    this.address = navParams.get('address');
    this.services = navParams.get('services');
    this.jobId = navParams.get('id');
    this.date = navParams.get('date');
    this.time = navParams.get('time');
    this.property_latitude = navParams.get('property_latitude');
    this.property_longitude = navParams.get('property_longitude');
  }


  ionViewWillEnter() {
    this.storage = new SecureStorage();
    this.platform.ready().then(() => {
      this.platform_ready = true;
      this.storage.create('status').then(
        () => {
          this.isStorageReady = true;
          if(this.isStorageReady) {
          this.storage.get('checklistStage-job-'+this.jobId).then(
            res => {
              console.log(res);
              this.button_txt = 'Continue Job';
            },
            error => {
              console.log(error);
              this.button_txt = 'Check-In';
            }
            );
          }
      });
    })
  }

  completeChecklist() {
    /*this.navCtrl.push(ChecklistPage, {
      id: this.id
    });*/
    this.platform.ready().then(() => {
      this.checklistBody = {
                  job: this.jobId,
        check_in_stamp: this.current_date.toISOString().slice(0,10) + ' ' + this.current_date.toISOString().slice(11, 16),
      }
      this.getChecklistId.checklistId(this.checklistBody).subscribe(
        checklist => {
          this.navCtrl.push(ChecklistStatusPage, {
              id: checklist.id,
              jobId: checklist.job,
              services: this.services,
              checklistObj: this.checklistBody
            });
        })
    })
  }

}

