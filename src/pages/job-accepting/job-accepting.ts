import { MarketPage } from './../jobs-list/market';
import { SecureStorage } from 'ionic-native';
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
    private isStorageReady:boolean;

    constructor(
        public navCtrl: NavController,
        private navParams: NavParams,
        private jobService: GetJobsService,
        private storage: SecureStorage
    ){
        this.job = navParams.get('job');
        this.jobId = this.job['id'];
        this.storage = new SecureStorage();
        this.storage.create('ptkStorage').then(res => this.isStorageReady = true);
        //console.log(this.jobId);
    }

    accept() {
        this.job['accepted'] = true;
        if(this.isStorageReady) {
            this.storage.get('user_id').then(
                user_id => {
                    this.job['provider'] = +user_id;
                    this.jobService.updateJobs(this.jobId, this.job).subscribe(res => this.navCtrl.popTo(MarketPage));
                },
                error => console.log(error)
            )
        }
    }

    discard() {
        this.navCtrl.popTo(MarketPage);
    }

}