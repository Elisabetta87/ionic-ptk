import { ChecklistService } from './../../services/checklist';
import { SecureStorage } from 'ionic-native/dist/es5/index';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular/index';
import { ChecklistStatusPage } from '../checklist-status/checklist-status';
import {DatePipe}  from "@angular/common";

@Component({
  selector: 'page-job-details',
  templateUrl: 'job-details.html',
  providers: [SecureStorage]
})
export class JobDetailsPage {
  /*set lat and lng for google map */
  property_latitude: number;
  property_longitude: number;

  private job: Object;
  private jobId: number;
  private id: number = 0;
  private address: string;
  private services: string;
  private checklistBody: Object;
  private current_date: Date = new Date();
  private isStorageReady: boolean;
  private button_txt: string;
  private date: string;
  private time: string;
  private platform_ready: boolean;
  private checklists: Object;
  private submitButton: boolean = true;
  private today = new Date();

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private storage: SecureStorage,
    private checklistService: ChecklistService,
    private platform: Platform
  ) {
    this.job = this.navParams.get('job');
    console.log(this.job);

    this.address = this.job['property_address'];
    this.services = this.job['services_string'];
    this.jobId = this.job['id'];
    this.date = this.job['date'];
    this.time = this.job['time'];
    this.property_latitude = +this.job['property_latitude'];
    this.property_longitude = +this.job['property_longitude'];
    this.checklists = this.job['checklists'];
  }


  ionViewWillEnter() {
    if(['Future', 'Past', 'Urgent', 'Untracked', 'Upcoming'].indexOf(this.job['action_status']) !== -1) {
      this.submitButton = false;
    } else if(['Transit', 'Late Check-In'].indexOf(this.job['action_status'])!== -1) {
      this.button_txt = 'Check-In';
      this.storage = new SecureStorage();
      this.platform.ready().then(() => {
        this.platform_ready = true;
        this.storage.create('ptkStorage').then(
          () => {
            this.isStorageReady = true;
            for(let key in this.checklists) {
              this.checklistService.getChecklist(key, this.checklists[key])
                  .subscribe(checklistObj => {
                    console.log(checklistObj);
                    this.storage.set('checklist-'+this.checklists[key], JSON.stringify(checklistObj));
                    this.storage.set('checklist-info-'+this.checklists[key], key);
                  })
                }
              },
              error => {
                console.log(error);
                this.button_txt = 'Check-In';
              })
          })
      } else if(['Checked-In', 'Late Check-Out'].indexOf(this.job['action_status']) !== -1) {
        this.button_txt = 'Continue Job'; //do I have to add the service name????
      } else if(this.job['action_status'] == 'Checked-Out') {
        this.button_txt = 'Checklist Completed';
      }
    }

  completeChecklist() {
    console.log(this.id);
    if(this.button_txt == 'Check-In') {
      this.platform.ready().then(() => {
        this.checklistBody = {
                    job: this.jobId,
        check_in_stamp: this.current_date.toISOString().slice(0,10) + ' ' + this.current_date.toISOString().slice(11, 16),
                  stage: '1'
        };
        for(let key in this.checklists) {
          if(this.isStorageReady) {
            this.storage.get('agent_name').then(
              res => {
                this.checklistBody['agent_name'] = res;
                this.uploadChecklist(key, this.checklists[key], this.checklistBody);
              },
              error => {
                console.log('LOGGED IN');
                this.uploadChecklist(key, this.checklists[key], this.checklistBody);
              }
            )
          }
        }
      
      })
    } else {
      if(this.isStorageReady) {
        this.storage.get('checklistStage-job-'+this.jobId).then(
          res => {
            this.id = JSON.parse(res).id;
            this.jobId = JSON.parse(res).job;
            console.log(this.id, res);
            this.storage.get('checklist-'+this.id).then(
              res => { this.navCtrl.push(ChecklistStatusPage, {
                id: this.id,
                jobId: this.jobId,
                services: this.services,
                checklistObj: JSON.parse(res)
              })
          }
        )
        }
        )
      }
    }  
  }


  uploadChecklist(service, checklistId, checklistBody:Object) {
    this.checklistService.putChecklist(service, checklistId, checklistBody).subscribe(
        checklist => {
          console.log(checklist);
          this.id = checklist.id;
          this.navCtrl.push(ChecklistStatusPage, {
              id: checklist.id,
              jobId: checklist.job,
              services: this.services,
              checklistObj: this.checklistBody
            });
        })
  }


}

