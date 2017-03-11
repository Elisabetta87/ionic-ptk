import { StorageST } from './../../services/StorageST';
import { MenuService } from './../../services/menu';
import { Diagnostic } from 'ionic-native';
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
  private jobs:any = {};
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
  private loading:any;
  private user_id: number;

  constructor(
    public  loadingCtrl: LoadingController,
    public navCtrl:NavController,
    private navParams: NavParams,
    private getJobsService: GetJobsService,
    public nav: Nav,
    private menuService: MenuService
  ) {
      this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      this.date = navParams.get('date');
      this.time = navParams.get('time');
      this.user_id = navParams.get('user_id');
      this.day = this.tomorrow.setDate(this.tomorrow.getDate()+1);
      this.tomorrow = this.tomorrow.toISOString().slice(0, 10);
  }

  ionViewDidEnter() {
    this.menuService.displayMenu();
  }    

  ionViewWillEnter() {
    console.log(StorageST.getKeys());
    let date = new Date();
    let newTime = date.getTime();
    if (Object.keys(this.jobs).length==0) {
      this.loading.present();
      this.getJobs(newTime);
    }
    else {
      StorageST.get('schedule-last-update')
               .subscribe(
                 res => {
                    console.log(res);
                    let start_time = +res;
                    let diff_time_mins = (newTime - start_time)/60000;
                    console.log(diff_time_mins);
                    if(diff_time_mins > 10) {
                      this.loading.present();
                      this.getJobs(newTime);
                    }
                 }
               )
     } 
  }

  getJobs(time_stamp:any) {
    console.log(StorageST.getKeys());
      StorageST.get('user_id')
               .subscribe(res => {
                  let user_id = +res;
                  this.params = {
                    start_date: this.today.toISOString().slice(0, 10),
                    end_date: this.twoWeeksAfter.toISOString().slice(0, 10),
                    status: 'accepted,complete',
                    user_id: user_id
                  }
                  console.log(this.params);
                  this.getJobsService.loadJobs(this.params)
                      .subscribe( resp => {
                          StorageST.set('schedule-last-update', time_stamp.toString())
                                   .subscribe(() => {
                                      if( resp.jobsAvailable ){
                                        this.jobsAvailable = true;
                                        this.jobs = resp.jobs;
                                      }
                                      else{
                                        this.message = resp.message;
                                      } 
                                      console.log(this.jobs);
                                      this.loading.dismiss();
                                   })
                      })
               })
  }

  pushPage(id:string, status: string) {
    for (let i = 0; i < this.jobs.length; i++) {
      if (this.jobs[i].id === id && status !== 'Failed') {
        this.navCtrl.push(JobDetailsPage, {
          job: this.jobs[i],
          agentName: ''
        });
      } else if (this.jobs[i].id === id && status === 'Failed') {
          console.log('job no more available!!!');
      }
    }
  }

}



