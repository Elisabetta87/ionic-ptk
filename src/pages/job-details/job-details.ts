import { ChecklistOverviewPage } from './../checklist-overview/checklist-overview';
//my pages
import { GetJobsService } from './../../services/get-jobs';
import { ChecklistService } from './../../services/checklist';
//ionic 
import { NavController, NavParams, Platform } from 'ionic-angular/index';
//angular
import { Component } from '@angular/core';
import {DatePipe}  from "@angular/common";

@Component({
  selector: 'page-job-details',
  templateUrl: 'job-details.html'
})
export class JobDetailsPage {
  /*set lat and lng for google map */
  private property_latitude: number;
  private property_longitude: number;
  private job: Object;
  private current_date: Date = new Date();
  private platform_ready: boolean;
  private submitButton: boolean = true;
  private today = new Date();
  private arrChecklists:any;
  private buttonStatus:string;
  private agentName:string;
  private setChecklistPage:Object;

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private checklistService: ChecklistService,
    private platform: Platform,
    private jobService: GetJobsService
  ) {
    this.job = this.navParams.get('job');
    this.agentName = this.navParams.get('agentName');
    console.log(this.job);
    console.log(this.agentName);
    this.platform.ready().then(() => {
      this.platform_ready = true;
    });
    this.property_latitude = +this.job['property_latitude'];
    this.property_longitude = +this.job['property_longitude'];
    this.arrChecklists = [];
    for(let key in this.job['checklists']) {
      this.arrChecklists.push(key);
    }
    // this.setChecklistPage = {
    //   'Greeting': GreetingOverviewPage,
    //   'Cleaning': CleaningOverviewPage
    // }
  }


  ionViewWillEnter() {
    if(!(this.platform_ready)) {
      return;
    }
    this.jobService.getJob(this.job['id'])
        .subscribe(job => {
          this.job = job;
          console.log(this.job);
          if(['Future', 'Past', 'Urgent', 'Untracked', 'Upcoming'].indexOf(this.job['action_status']) !== -1) {
            this.submitButton = false;
            this.buttonStatus = 'Unnecessary';
          } else if(['Transit', 'Late Check-In'].indexOf(this.job['action_status'])!== -1) {
            this.submitButton = true;
            this.buttonStatus = 'Check-In';
          } else if(['Checked-In', 'Late Check-Out'].indexOf(job['action_status']) !== -1) {
            this.submitButton = true;
            this.buttonStatus = 'Continue';
          } else if(job['action_status'] == 'Checked-Out') {
            this.submitButton = true;
            this.buttonStatus = 'Complete';
          } else {
            this.submitButton = false;
            this.buttonStatus = 'Unnecessary';
          }
        })

    // What if they cannot connect to the internet for this GET request?]
    // We need to catch that possibility here, and show a prompt for them to use the wifi information
    // (And, for this, we need to make sure that wifi information is passed with original job)

  }

  checkinChecklist() {
    if(!(this.platform_ready)) {
      return;
    }
    for(let checklistName in this.job['checklists']) {
      let checklistId = this.job['checklists'][checklistName];
      let checklistObj = {};
      checklistObj['check_in_stamp'] = this.current_date.toISOString().slice(0,10) + ' ' + this.current_date.toISOString().slice(11, 16);
      checklistObj['stage'] = '1';
      checklistObj['job'] = this.job['id'];
      if (this.agentName) {checklistObj['agent_name'] = this.agentName;}
      this.checklistService.putChecklist(checklistName, checklistId, checklistObj).subscribe(checklist => {});  
    }
    let checklistName = this.arrChecklists[0];
    let checklistId = this.job['checklists'][checklistName];
    //let redirect = this.setChecklistPage[checklistName];
    //
    this.navCtrl.push(ChecklistOverviewPage, {
                job: this.job,
      checklistName: checklistName,
        checklistId: checklistId
    });
  }

  completeChecklist(checklistName:string) {
    if(!(this.platform_ready)) {
      return;
    }
    let checklistId = this.job['checklists'][checklistName];
    //let redirect = this.setChecklistPage[checklistName];
    //
    this.navCtrl.push(ChecklistOverviewPage, {
                job: this.job,
      checklistName: checklistName,
        checklistId: checklistId
    })
  }

}
