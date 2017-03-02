import { SecureStorage } from 'ionic-native';
import { JobAcceptingPage } from './../job-accepting/job-accepting';
import { GetJobsService } from './../../services/get-jobs';
import { Component } from '@angular/core';
import {NavController, LoadingController, NavParams} from "ionic-angular/index";




@Component({
  selector: 'page-market',
  templateUrl: 'jobs-list.html'
})
export class MarketPage {

  private isStorageReady: boolean;
  private params_market = {};
  private date: any = new Date();
  private twoWeeksAfter: any =  new Date(+new Date + 12096e5);
  private jobsAvailable:boolean;
  private jobs:any;
  private message: string;
  private market:boolean = true;
  private tomorrow: any = new Date();
  private params = {};
  private today: any = new Date(); 

  constructor(
    public loadingCtrl: LoadingController,
    public navCtrl:NavController,
    private navParams: NavParams,
    private getJobsService: GetJobsService,
    private storage: SecureStorage
  ) {
    this.storage.create('ptkStorage').then(res => this.isStorageReady = true);

    this.date.setDate(this.date.getDate() + 1);
    this.twoWeeksAfter.setDate(this.twoWeeksAfter.getDate() + 1);
    
    let loading = this.loadingCtrl.create({
        content: 'Please wait...'
    });
        
    loading.present();

    this.params_market = {
      start_date: this.date.toISOString().slice(0, 10),
      end_date: this.twoWeeksAfter.toISOString().slice(0, 10),
      status: 'available,accepted',
      user_id: 31 //|| navParams.get('id')
    }

    this.tomorrow = this.params_market['start_date'];
    this.params = {start_date: this.today.toISOString().slice(0, 10)};
  
  //On Market Page Load: -create 'market-last-update' into the storage (width time_stamp), everytime page loads check:  if not MLU: Get and create MLU else if (Now-MLC)>=10mins then get update MLC 

    this.getJobsService
            .loadJobs(this.params_market)
            .subscribe( resp => {
                  loading.dismiss();
                  console.log(resp);
                  if( resp.jobsAvailable ){
                      this.jobsAvailable = true;
                      this.jobs = resp.jobs;
                  }
                  else{
                    this.message = resp.message;
                  }  
            });

  }


  pushPage(id:string, status: string) {
    for (let i = 0; i < this.jobs.length; i++) {
      if (this.jobs[i].id === id && status !== 'Accepted') {
        this.navCtrl.push(JobAcceptingPage, {job: this.jobs[i]});
      }
    } 
  }

}

