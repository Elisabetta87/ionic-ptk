import { TabsPage } from './../tabs/tabs';
import { MenuComponent } from './../../components/menu/menu';
import { Component } from '@angular/core';
import { SecureStorage } from 'ionic-native/dist/es5/index';
import { NavController, LoadingController, NavParams } from 'ionic-angular/index';
import { JobDetailsPage } from '../job-details/job-details';
import {GetJobsService} from "../../services/get-jobs";


@Component({
  selector: 'page-jobs-list',
  templateUrl: 'jobs-list.html',
  providers: [SecureStorage]
})
export class JobsListPage {

  private jobsAvailable:boolean;
  private jobs:any;
  private params: Object;
  private today: any = new Date();
  private twoWeeksAfter: any =  new Date(+new Date + 12096e5);

  

  constructor(
    public  loadingCtrl: LoadingController,
    public navCtrl:NavController,
    private navParams: NavParams,
    private getJobsService: GetJobsService
  ) {

    let loading = this.loadingCtrl.create({
     content: 'Please wait...'
    });
    
    loading.present();

    
  
    this.params = {
      start_date: this.today.toISOString().slice(0, 10),
      end_date: this.twoWeeksAfter.toISOString().slice(0, 10),
      status: 'accepted,completed',
      userID: navParams.get('id')
    }

    this.getJobsService.getJobs(this.params, {withCredentials: ''})
     .subscribe(resp => {
       console.log(resp);
       this.jobs = [];
       this.jobsAvailable = true;
       for(let i=0; i< resp.count; i++) {
         this.jobs.push(resp.results[i]);
       };
       loading.dismiss();
       console.log(this.jobs);
     });
  }

  //this function needs to be called inside future function that gets API jobs list info
  //getJobs() {}

  pushPage(id:string, status: string) {
    for (let i = 0; i < this.jobs.length; i++) {
      if (this.jobs[i].id === id && status !== 'red') {
        this.navCtrl.push(JobDetailsPage, {
                    address : this.jobs[i].property_address,
                   services : this.jobs[i].services_string,
                         id : this.jobs[i].id,
          property_latitude : +this.jobs[i].property_latitude,
          property_longitude: +this.jobs[i].property_longitude
          }
        );
      } else if (this.jobs[i].id === id && status === 'red') {
          console.log('job no more available!!!');
      }
    }
  }

}
