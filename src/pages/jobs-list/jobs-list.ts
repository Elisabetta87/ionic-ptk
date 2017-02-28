import { TabsPage } from './../tabs/tabs';
import { MenuComponent } from './../../components/menu/menu';
import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams, Nav } from 'ionic-angular/index';
import { JobDetailsPage } from '../job-details/job-details';
import {GetJobsService} from "../../services/get-jobs";


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
  private setDay: string;
  private date: string;
  private time: string;
  
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
        
      
        this.params = {
          start_date: this.today.toISOString().slice(0, 10),
          end_date: this.twoWeeksAfter.toISOString().slice(0, 10),
          status: 'accepted,completed',
          user_id: 31 || navParams.get('id')
        }

        this.getJobsService
            .lopadJobs(this.params)
            .subscribe( resp => {
                  loading.dismiss();
                  if( resp.jobsAvailable ){
                      this.jobsAvailable = true;
                      this.jobs = resp.jobs;
                  }
                  else{
                    this.message = resp.message;
                  }  
            });

        // if (this.params['user_id'] != undefined) {
        //     this.getJobsService.getJobs(this.params)
        //     .subscribe(resp => {
        //       this.jobs = [];
        //       this.jobsAvailable = true;
        //       if (resp.results.length == 0) {
        //         this.jobsAvailable = false;
        //         this.message = 'Sorry, no jobs available!!';
        //         this.loading.dismiss();
        //       } else {
        //           for(let i=0; i< resp.results.length; i++) {
        //               this.jobs.push(resp.results[i]);
        //           };
        //           this.loading.dismiss();
        //       }
        //     });
        // } else {
        //   this.jobsAvailable = false;
        //   this.message = 'Sorry, no jobs available!!';
        //   this.loading.dismiss();
        // }
        
        // let getJobsInfo = this.getJobsService.loadJobs(this.params, this.loading);
        // console.log(getJobsInfo);
        // this.jobs = getJobsInfo.jobs;
        // this.jobsAvailable = getJobsInfo.jobsAvailable;
        // this.message = getJobsInfo.message;
        // console.log(this.jobs, this.jobsAvailable, this.message);
        // loading.dismiss();
        
  }
//ionViewDidEnter
  // ionViewDidEnter() {
  //   let getJobsInfo = this.getJobsService.loadJobs(this.params, this.loading);
  //       console.log(getJobsInfo);
  //       let view = this.nav.getActive();
  //       console.log(view.component.name);
  // }

  pushPage(id:string, status: string) {
    for (let i = 0; i < this.jobs.length; i++) {
      if (this.jobs[i].id === id && status !== 'red') {
        this.navCtrl.push(JobDetailsPage, {
                    address : this.jobs[i].property_address,
                   services : this.jobs[i].services_string,
                         id : this.jobs[i].id,
          property_latitude : +this.jobs[i].property_latitude,
         property_longitude : +this.jobs[i].property_longitude,
                       date : this.jobs[i].date,
                       time : this.jobs[i].time
          }
        );
      } else if (this.jobs[i].id === id && status === 'red') {
          console.log('job no more available!!!');
      }
    }
  }

}



