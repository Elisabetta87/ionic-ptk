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
    private getJobsService: GetJobsService,
    private storage: SecureStorage
  ) {
    this.storage.create('ptkStorage').then(res => this.isStorageReady = true);

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
    else if(this.isStorageReady) {  
      this.storage.get('market-last-update').then(
        res => {
            let start_time = +res;
            let diff_time_mins = (newTime - start_time)/60000;
            console.log(diff_time_mins);
            if(diff_time_mins > 10 || this.forceGetRequest) {
              this.loading.present();
              this.getJobs(newTime);
            } else {
              console.log(res);
            }
        },
        error => {
          this.loading.present();
          this.getJobs(newTime);
        }
      ) 
    }
  }

  getJobs(time_stamp:any) {
    if(this.isStorageReady) {
      this.storage.get('user_id').then(res => {
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
            this.storage.set('market-last-update', time_stamp.toString()).then(
              done => {
                    if( resp.jobsAvailable ){
                      this.jobsAvailable = true;
                      this.jobs = resp.jobs;
                      console.log(this.jobs);
                    }
                    else{
                      this.message = resp.message;
                    } 
                    this.loading.dismiss();
                  },
              error => {
                console.log('market-last-update has not been created');
               }   
            )
        });
      })
    }
  }

  pushPage(id:string, status: string) {
    for (let i = 0; i < this.jobs.length; i++) {
      if (this.jobs[i].id === id && status !== 'Accepted') {
        this.navCtrl.push(JobAcceptingPage, {job: this.jobs[i]});
      }
    } 
  }

}

