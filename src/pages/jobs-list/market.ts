import { StorageST } from './../../services/StorageST';
import { JobAcceptingPage } from './../job-accepting/job-accepting';
import { GetJobsService } from './../../services/get-jobs';
import { Component, ViewChild } from '@angular/core';
import {NavController, LoadingController, NavParams, Content} from "ionic-angular/index";




@Component({
  selector: 'page-market',
  templateUrl: 'jobs-list.html'
})
export class MarketPage {
   @ViewChild(Content) content: Content;

  private params_market = {};
  private date: any = new Date();
  private twoWeeksAfter: any =  new Date(+new Date + 12096e5);
  private jobsAvailable:boolean;
  private jobs:any = {};
  private message: string;
  private market:boolean = true;
  private tomorrow: any = new Date();
  private params = {};
  private today: any = new Date(); 
  private time_stamp = new Date();
  private loading:any;
  private forceGetRequest:boolean = false;

  constructor(
    public loadingCtrl: LoadingController,
    public navCtrl:NavController,
    private navParams: NavParams,
    private getJobsService: GetJobsService
  ) {

    this.date.setDate(this.date.getDate() + 1);
    this.twoWeeksAfter.setDate(this.twoWeeksAfter.getDate() + 1);

    this.forceGetRequest = this.navParams.get('forceGetRequest');
    
    this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
    });
      
    this.params = {start_date: this.today.toISOString().slice(0, 10)};

  }

  ionViewWillEnter() {
    let date = new Date();
    let newTime = date.getTime();
    if (Object.keys(this.jobs).length==0) {
      this.loading.present();
      this.getJobs(newTime);
    }
    else {
      StorageST.get('market-last-update')
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
                  this.params_market = {
                    start_date: this.date.toISOString().slice(0, 10),
                    end_date: this.twoWeeksAfter.toISOString().slice(0, 10),
                    status: 'available,accepted',
                    user_id: user_id
                  };
                  this.tomorrow = this.params_market['start_date'];
                  this.getJobsService.loadJobs(this.params_market)
                      .subscribe( resp => {
                          StorageST.set('market-last-update', time_stamp.toString())
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
                                      this.content.resize();
                                      console.log(this.content.resize());
                                   })
                      });
               })
  }

  pushPage(id:string, status: string) {
    for (let i = 0; i < this.jobs.length; i++) {
      if (this.jobs[i].id === id && status !== 'Accepted') {
        this.navCtrl.push(JobAcceptingPage, {job: this.jobs[i]});
      }
    } 
  }

}

