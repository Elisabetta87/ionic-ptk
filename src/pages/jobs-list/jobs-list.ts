import { Component } from '@angular/core';
import {SecureStorage} from "ionic-native/dist/es5/index";


@Component({
  selector: 'page-jobs-list',
  templateUrl: 'jobs-list.html',
  providers: [SecureStorage]
})
export class JobsListPage {

  private jobsAvailable: boolean;
  private jobs: any;
  private status: Array<string>;
  private statusColor: string;

  constructor() {

    this.jobsAvailable = true;

    this.status = ['complete', 'past and not complete', 'current and not complete', 'future', 'unaccepted'];
    this.statusColor = this.status[0] ? 'green' : '';

    this.jobs = [
      { id      : '1',
        dateTime: '6-02-17',
        address : '64, Streatham Vale, SW16 5TD',
        service : 'cleaning',
        status  : this.status[0]},
      { id      : '2',
        dateTime: '18-01-17',
        address : '60, Tooting Bec, SW16 5TD',
        service : 'delivery grocery',
        status  : this.status[1]},
      { id      : '3',
        dateTime: '8-03-17',
        address : '54, Streatham Hill, SW16',
        service : 'pick keys up',
        status  : this.status[2]},
      { id      : '4',
        dateTime: '12-04-17',
        address : '12, Balham, SW17',
        service : 'delivery keys to the new guest',
        status  : this.status[3]},
      { id      : '5',
        dateTime: '8-03-17',
        address : '4, Oval, SW16',
        service : 'cleaning',
        status  : this.status[4]}
    ];

    if(this.status[0]) {
     this.statusColor = 'green';
     } else if(this.status[1]) {
     this.statusColor = 'red';
     } else if(this.status[2]) {
     this.statusColor = 'orange';
     } else if(this.status[3]) {
     this.statusColor = 'yellow';
     } else if(this.status[4]) {
     this.statusColor = 'grey';
     }
  }

  //this function needs to be called inside future function that gets API jobs list info
  //getJobs() {}




}
