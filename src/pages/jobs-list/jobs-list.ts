import { Component } from '@angular/core';
import { SecureStorage } from 'ionic-native/dist/es5/index';
import { NavController } from 'ionic-angular/index';
import { JobDetailsPage } from '../job-details/job-details';


@Component({
  selector: 'page-jobs-list',
  templateUrl: 'jobs-list.html',
  providers: [SecureStorage]
})
export class JobsListPage {

  private jobsAvailable:boolean;
  private jobs:any;
  //private status: string;

  constructor(public navCtrl:NavController) {

    this.jobsAvailable = true;

    this.jobs = [
      {
        id: '1',
        dateTime: '6-02-17',
        address: '64, Streatham Vale, SW16 5TD',
        service: 'cleaning',
        status: 'green'
      },
      {
        id: '2',
        dateTime: '18-01-17',
        address: '60, Tooting Bec, SW16 5TD',
        service: 'delivery grocery',
        status: 'red'
      },
      {
        id: '3',
        dateTime: '8-03-17',
        address: '54, Streatham Hill, SW16',
        service: 'pick keys up',
        status: 'orange'
      },
      {
        id: '4',
        dateTime: '12-04-17',
        address: '12, Balham, SW17',
        service: 'delivery keys to the new guest',
        status: 'yellow'
      },
      {
        id: '5',
        dateTime: '8-03-17',
        address: '4, Oval, SW16',
        service: 'cleaning',
        status: 'grey'
      }
    ];
  }

  //this function needs to be called inside future function that gets API jobs list info
  //getJobs() {}

  pushPage(id:string, status: string) {
    for (let i = 0; i < this.jobs.length; i++) {
      if (this.jobs[i].id === id && status !== 'red') {
        this.navCtrl.push(JobDetailsPage, {
          address: this.jobs[i].address,
          service: this.jobs[i].service,
               id: this.jobs[i].id
          }
        );
      } else if (this.jobs[i].id === id && status === 'red') {
          console.log('job no more available!!!');
      }
    }
  }

}
