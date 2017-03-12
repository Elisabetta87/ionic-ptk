import { MorePage } from './../more/more';
import { StorageST } from './../../services/StorageST';
import { GetJobsService } from './../../services/get-jobs';
import { Component } from '@angular/core';
import {NavController, LoadingController, NavParams} from "ionic-angular/index";




@Component({
  selector: 'page-pastJobs',
  templateUrl: 'jobs-list.html'
})
export class PastJobsPage {

  private params_pastJobs = {};
  private twoWeeksBefore: any =  new Date();
  private jobsAvailable:boolean;
  private jobs:any = {};
  private message: string;
  private pastJobs:boolean = true;
  private params = {};
  private yesterday: any = new Date(); 
  private loading:any;
  private forceGetRequest:boolean = false;

  constructor(
    public loadingCtrl: LoadingController,
    public navCtrl:NavController,
    private navParams: NavParams,
    private getJobsService: GetJobsService
  ) {

    this.yesterday.setDate(this.yesterday.getDate() - 1);
    this.twoWeeksBefore.setDate(this.twoWeeksBefore.getDate() - 14);
    console.log(this.yesterday);
    console.log(this.twoWeeksBefore);

    this.forceGetRequest = this.navParams.get('forceGetRequest');
    
    this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
    });
      
    this.params = {start_date: this.yesterday.toISOString().slice(0, 10)};

  }

  ionViewWillEnter() {
    let date = new Date();
    let newTime = date.getTime();
    if (Object.keys(this.jobs).length==0) {
      this.loading.present();
      this.getJobs(newTime);
    }
    else {
      StorageST.get('pastJobs-last-update')
               .subscribe(res => {
                  let start_time = +res;
                  let diff_time_mins = (newTime - start_time)/60000;
                  console.log(diff_time_mins);
                  if(diff_time_mins > 10 || this.forceGetRequest) {
                    this.loading.present();
                    this.getJobs(newTime);
                  }
               })
    }
  }

  getJobs(time_stamp:any) {
      StorageST.get('user_id')
               .subscribe(res => {
                  let user_id = +res;
                  this.params_pastJobs = {
                    start_date: this.yesterday.toISOString().slice(0, 10),
                    end_date: this.twoWeeksBefore.toISOString().slice(0, 10),
                    status: 'complete',
                    user_id: user_id
                  };
                  console.log(this.params_pastJobs);
                  this.yesterday = this.params_pastJobs['start_date'];
                  this.getJobsService.loadJobs(this.params_pastJobs)
                      .subscribe( resp => {
                          StorageST.set('pastJobs-last-update', time_stamp.toString())
                                   .subscribe(() => {
                                      if( resp.jobsAvailable ){
                                        this.jobsAvailable = true;
                                        this.jobs = resp.jobs;
                                        console.log(this.jobs);
                                      }
                                      else{
                                        this.message = resp.message;
                                      } 
                                      this.loading.dismiss();
                                   })
                      });
               })
  }

  ionViewDidLeave() {
    this.navCtrl.push(MorePage);
  }

}