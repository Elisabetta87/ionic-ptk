import { GetJobsService } from './../../services/get-jobs';
import { JobsListPage } from './../jobs-list/jobs-list';
import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import {NavController, LoadingController, NavParams} from "ionic-angular/index";




@Component({
  selector: 'page-market',
  templateUrl: 'jobs-list.html'
})
export class MarketPage {

  private params_market = {};
  private date: any = new Date();
  private twoWeeksAfter: any =  new Date(+new Date + 12096e5);
  private jobsAvailable:boolean;
  private jobs:any;
  private message: string;

  constructor(
    public loadingCtrl: LoadingController,
    public navCtrl:NavController,
    private navParams: NavParams,
    private getJobsService: GetJobsService
  ) {
    console.log('MARKET PLACE');
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
    
    this.getJobsService
            .lopadJobs(this.params_market)
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

}

