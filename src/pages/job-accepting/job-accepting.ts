import { GetJobsService } from './../../services/get-jobs';
import { NavController, NavParams } from 'ionic-angular/index';
import { Component } from '@angular/core';







@Component({
    selector: 'job-accepting-page',
    templateUrl: 'job-accepting.html'
})

export class JobAcceptingPage {

    private job:Object;
    private jobId:number;

    constructor(
        public navCtrl: NavController,
        private navParams: NavParams,
        private jobService: GetJobsService
    ){
        this.job = navParams.get('job');
        this.jobId = this.job['id'];
        console.log(this.jobId);
    }

    accept() {
        this.jobService.updateJobs(this.jobId, {accepted: true}).subscribe(res => console.log(res));
    }

}