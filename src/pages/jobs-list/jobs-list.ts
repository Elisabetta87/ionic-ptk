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
  private green: string;
  
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
                  if( resp.jobsAvailable ){
                      this.jobsAvailable = true;
                      this.jobs = resp.jobs;
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
      } else if (this.jobs[i].id === id && status === 'Failed') {
          console.log('job no more available!!!');
      }
    }
  }

}



