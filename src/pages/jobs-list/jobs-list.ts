import { TabsPage } from './../tabs/tabs';
import { MenuComponent } from './../../components/menu/menu';
import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams, Nav } from 'ionic-angular/index';
import { JobDetailsPage } from '../job-details/job-details';
import {GetJobsService} from "../../services/get-jobs";
import {DatePipe}  from "@angular/common";


@Component({
  selector: 'page-jobs-list',
  templateUrl: 'jobs-list.html'
})
export class JobsListPage {

  private jobsAvailable:boolean;
  private jobs:any;
  private params: Object;
  private today: any = new Date();
  private twoWeeksAfter: any =  new Date(+new Date + 12096e5);
  private message: string;
  private date: string;
  private time: string;
  private green: string;
  private schedule:boolean = true;
  private tomorrow: any = new Date();
  private day: any;


  constructor(
    public  loadingCtrl: LoadingController,
    public navCtrl:NavController,
    private navParams: NavParams,
    private getJobsService: GetJobsService,
    public nav: Nav
  ) {

        let loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
        
        loading.present();

        this.date = navParams.get('date');
        this.time = navParams.get('time');

        this.day = this.tomorrow.setDate(this.tomorrow.getDate()+1);
        this.tomorrow = this.tomorrow.toISOString().slice(0, 10);
      
        this.params = {
          start_date: this.today.toISOString().slice(0, 10),
          end_date: this.twoWeeksAfter.toISOString().slice(0, 10),
          status: 'accepted,complete',
          user_id: 30 || navParams.get('id')
        }

        this.getJobsService
            .loadJobs(this.params)
            .subscribe( resp => {
                  if( resp.jobsAvailable ){
                      this.jobsAvailable = true;
                      this.jobs = resp.jobs;
                      console.log(this.jobs);
                  }
                  else{
                    this.message = resp.message;
                  } 
                  loading.dismiss(); 
            });
        
  }

  pushPage(id:string, status: string) {
    for (let i = 0; i < this.jobs.length; i++) {
      if (this.jobs[i].id === id && status !== 'Failed') {
        this.navCtrl.push(JobDetailsPage, {job: this.jobs[i]});
      } else if (this.jobs[i].id === id && status === 'Failed') {
          console.log('job no more available!!!');
      }
    }
  }

}



