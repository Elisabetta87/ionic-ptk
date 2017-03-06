//my pages
import { CleaningOverviewPage } from './../cleaning-overview/cleaning-overview';
import { GetJobsService } from './../../services/get-jobs';
import { ChecklistService } from './../../services/checklist';
import { GreetingOverview } from './../greeting-overview/greeting-overview';
//ionic 
import { SecureStorage } from 'ionic-native/dist/es5/index';
import { NavController, NavParams, Platform } from 'ionic-angular/index';
//angular
import { Component } from '@angular/core';
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
  private arrChecklists:any;
  private buttonInfo:string;
  private setChecklistPage:Object;

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private storage: SecureStorage,
    private checklistService: ChecklistService,
    private platform: Platform,
    private jobService: GetJobsService
  ) {
    this.job = this.navParams.get('job');
    console.log(this.job);
    this.storage = new SecureStorage();
    this.platform.ready().then(() => {
      this.platform_ready = true;
      this.storage.create('ptkStorage').then(
        () => this.isStorageReady = true)});

    this.address = this.job['property_address'];
    this.services = this.job['services_string'];
    this.jobId = this.job['id'];
    this.date = this.job['date'];
    this.time = this.job['time'];
    this.property_latitude = +this.job['property_latitude'];
    this.property_longitude = +this.job['property_longitude'];
    this.checklists = this.job['checklists'];
    this.arrChecklists = [];
    for(let key in this.checklists) {
      this.arrChecklists.push(key);
    }
    this.setChecklistPage = {
      Greeting: GreetingOverview,
      Cleaning: CleaningOverviewPage
    }

  }


  ionViewWillEnter() {
    this.jobService.getJob(this.jobId)
        .subscribe(job => {
          console.log(job);
          if(this.isStorageReady && this.platform_ready) {
            if(['Future', 'Past', 'Urgent', 'Untracked', 'Upcoming'].indexOf(job['action_status']) !== -1) {
              this.submitButton = false;
            } else {
              for(let key in this.checklists) {
                console.log(this.arrChecklists);
                this.checklistService.getChecklist(key, this.checklists[key])
                  .subscribe(checklistObj => {
                    console.log(checklistObj);
                    this.storage.set('checklist-'+this.checklists[key], JSON.stringify(checklistObj));
                    this.storage.set('checklist-info-'+this.checklists[key], key);
                    if(['Transit', 'Late Check-In'].indexOf(job['action_status'])!== -1) {
                      this.submitButton = true;
                      this.button_txt = ' Check-In';
                    } else if(['Checked-In', 'Late Check-Out'].indexOf(job['action_status']) !== -1) {
                      this.submitButton = true;
                      // this.storage.get('checklist-'+this.checklists[key]).then(checklist => {
                      //   let checklistStage = JSON.parse(checklist).stage;
                      //   if(checklistStage == '6' && Object.keys(this.checklists).indexOf(key)<Object.keys(this.checklists).length) {

                      //   } 
                      // })
                      this.button_txt = 'Continue ' + key + ' Checklist';
                      this.buttonInfo = 'Continue ';
                    } else if(job['action_status'] == 'Checked-Out') {
                      this.submitButton = true;
                      this.button_txt = 'Checklist ' + key + ' Completed';
                    }
                  })
              }
            }    
          }
      })
  }

  completeChecklist(serviceName:string) {
    for(let key in this.checklists) {
      if(this.platform_ready && this.isStorageReady && this.button_txt == key + ' Check-In') {
          this.checklistBody = {
                      job: this.jobId,
          check_in_stamp: this.current_date.toISOString().slice(0,10) + ' ' + this.current_date.toISOString().slice(11, 16),
                    stage: '1'
          };
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
      } else if(this.platform_ready && this.isStorageReady && this.button_txt == 'Continue ' + key + ' Checklist') {
        for(let index in this.setChecklistPage) {
          if(index === serviceName) {
            this.storage.get('checklist-'+this.checklists[key]).then(
              res => {
                this.navCtrl.push(this.setChecklistPage[index], {
                            id: JSON.parse(res).id,
                        jobId: JSON.parse(res).job,
                      service: serviceName,
                  checklistObj: this.checklists
                })
              },
              error => console.log(error)
              )
          }
        }
      //   console.log(key, this.checklists);
      //   console.log('entry');
      //    this.storage.get('checklist-'+this.checklists[key]).then(
      //     res => {
      //       this.navCtrl.push(CleaningOverviewPage, {
      //                   id: JSON.parse(res).id,
      //                jobId: JSON.parse(res).job,
      //              service: this.services,
      //         checklistObj: this.checklists
      //       })
      //     },
      //     error => console.log(error)
      //     )
      } //else if completed?????
    }   
  }


  uploadChecklist(service, checklistId, checklistBody:Object) {
    this.checklistService.putChecklist(service, checklistId, checklistBody).subscribe(
        checklist => {
          console.log(checklist);
          this.id = checklist.id;
          this.navCtrl.push(CleaningOverviewPage, {
              id: checklist.id,
              jobId: checklist.job,
              services: this.services,
              checklistObj: this.checklistBody
            });
        })
  }


}

