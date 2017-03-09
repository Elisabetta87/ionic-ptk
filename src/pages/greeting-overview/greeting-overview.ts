import { StorageST } from './../../services/StorageST';
import { GreetingChecklistPage } from './../greeting-checklist/greeting-checklist';
import { ChecklistService } from './../../services/checklist';
import { NavController, NavParams, LoadingController, Platform } from 'ionic-angular/index';
import { Component } from '@angular/core';


@Component({
    selector: 'greeting-overview',
    templateUrl: 'greeting-overview.html'
})

export class GreetingOverviewPage {

    private checklistId: number;
    private job: Object;
    private checklistObj:Object;
    private checklistName: string;
    private greenBar: string;
    private isToggled: boolean;
    private check_out: boolean;
    private stage: string;
    private current_date: Date = new Date();

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private loadingCtrl: LoadingController,
        private platform: Platform,
        private checklistService: ChecklistService
    ){
        this.checklistId = navParams.get('checklistId');
        this.job = navParams.get('job');
        this.checklistName = navParams.get('checklistName');
        this.greenBar = this.checklistId ? 'greenBar' : '';
        this.isToggled = false;
        this.check_out = false;
    }

    ionViewWillEnter() {
    let loading = this.loadingCtrl.create({
        content: 'Please wait...'
    });
    loading.present();
    this.platform.ready().then(() => {
        console.log(StorageST.getKeys());
        if(StorageST.getKeys().indexOf('checklist-'+this.job['checklists']['Greeting']) == -1) {
            console.log('error checklist not found'); 
            this.checklistService.getChecklist(this.checklistName, this.checklistId)
                .subscribe(checklistObj => {
                    console.log(checklistObj);
                    this.checklistObj = checklistObj;
                    this.stage = this.checklistObj['stage'];
                    StorageST.set('checklist-'+this.checklistId, checklistObj).subscribe();
                    StorageST.set('checklist-info-'+this.checklistId, this.checklistName).subscribe(); 
                    if (+this.stage>=1) {
                        this.isToggled = true;
                        if(+this.stage==4) {
                            this.check_out = true;
                        }
                    }
                })
            loading.dismiss(); 
        } else {
             StorageST.get('checklist-'+this.job['checklists']['Greeting'])
                 .subscribe(
                     checklistString => { 
                        this.checklistObj = JSON.parse(checklistString);
                        console.log(this.checklistObj);
                        this.stage = this.checklistObj['stage'];
                        console.log(+this.stage);
                        if (+this.stage>=1) {
                            this.isToggled = true;
                            if(+this.stage==4) {
                                this.check_out = true;
                            }
                        }
                        loading.dismiss();
                     }
                 )
        }
    });
  } 

    guestGreeted() {
      if(!this.isToggled) {
          return;
      } 
      if (+this.checklistObj['stage'] < 2) {
        this.checklistObj['stage'] = '2';
        this.checklistObj['guests_greeted'] = true;
        StorageST.set('checklist-'+this.checklistId, this.checklistObj).subscribe();
      }
    }

    greetingChecklist() {
      StorageST.get('checklist-'+this.job['checklists']['Greeting'])
               .subscribe(
                   checklistString => {
                     this.checklistObj = JSON.parse(checklistString);
                     this.navCtrl.push(GreetingChecklistPage, {
                        job: this.job,
                        checklistObj: this.checklistObj
                     });
                   },
                   error => {
                     this.navCtrl.push(GreetingChecklistPage, {
                       job: this.job,
                       checklistObj: this.checklistObj
                     });
                   }
               ) 
    }

    checkOut() {
      if (this.check_out) {
        StorageST.get('checklist-'+this.job['checklists']['Greeting'])
                 .subscribe(checklistString => {
                    this.checklistObj = JSON.parse(checklistString);
                    this.checklistObj['stage'] = '4';
                    this.checklistObj['job'] = this.job['id'];
                    this.checklistObj['check_out_stamp'] = this.current_date.toISOString().slice(0,10) + ' ' + this.current_date.toISOString().slice(11, 16);
                    StorageST.set('checklist-'+this.job['checklists']['Greeting'], this.checklistObj).subscribe();
                    this.checklistService.putChecklist(this.checklistName, this.job['checklists']['Greeting'], this.checklistObj).subscribe();
                 })
      }
      return this.check_out;
    }






}



