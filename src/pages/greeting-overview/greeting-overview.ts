import { GreetingChecklistPage } from './../greeting-checklist/greeting-checklist';
import { ChecklistService } from './../../services/checklist';
import { SecureStorage } from 'ionic-native';
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
    private isStorageReady: boolean;
    private stage: string;
    private current_date: Date = new Date();

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private storage: SecureStorage,
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
    this.storage = new SecureStorage();
    this.platform.ready().then(() => {
      this.storage.create('ptkStorage').then(
        () => {
          this.isStorageReady = true;
          this.storage.get('checklist-'+this.job['checklists']['Greeting']).then(
            checklistString => {
              this.checklistObj = JSON.parse(checklistString);
              this.stage = this.checklistObj['stage'];
              console.log(+this.stage);
               if (+this.stage>=1) {
                  this.isToggled = true;
                  if(+this.stage==4) {
                    this.check_out = true;
                  }
               }
            },
            error => {
              console.log(error);
              this.checklistService.getChecklist(this.checklistName, this.checklistId)
                .subscribe(checklistObj => {
                  console.log(checklistObj);
                  this.storage.set('checklist-'+this.checklistId, JSON.stringify(checklistObj));
                  this.storage.set('checklist-info-'+this.checklistId, this.checklistName); 
                  this.stage = this.checklistObj['stage'];
                  if (+this.stage>=1) {
                      this.isToggled = true;
                      if(+this.stage==4) {
                         this.check_out = true;
                      }
                  }
                })
            }
          ); 
        }
      )
      loading.dismiss();
    });
  } 

    guestGreeted() {
      if (this.isToggled) {  
        this.storage = new SecureStorage();
        this.storage.create('ptkStorage').then(
            ready => {
                this.isStorageReady = true;
                if(this.isStorageReady) {
                    this.storage.get('checklist-'+this.job['checklists']['Greeting']).then(
                    data => {
                        let obj = JSON.parse(data);
                        if(obj.stage == '1') {
                            obj['stage'] = '2';  
                            console.log(obj);         
                            this.storage.set('checklist-'+this.job['checklists']['Greeting'], JSON.stringify(obj)).then(res => console.log(res));
                            }
                    },
                    error => console.log(error)
                    )
                }
            }
        ); 
      }
      return this.isToggled;
    }

    greetingChecklist() {
      if(this.isStorageReady) {
        this.storage.get('checklist-'+this.job['checklists']['Greeting']).then(
            res => {
            this.checklistObj = JSON.parse(res);
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
    }



    checkOut() {
      if (this.check_out) {
        this.storage = new SecureStorage();
        this.storage.create('ptkStorage').then(
            ready => {
                    this.storage.get('checklist-'+this.job['checklists']['Greeting']).then(
                    checklistString => {
                        this.checklistObj = JSON.parse(checklistString);
                        this.checklistObj['stage'] = '4';
                        this.checklistObj['job'] = this.job['id'];
                        this.checklistObj['check_out_stamp'] = this.current_date.toISOString().slice(0,10) + ' ' + this.current_date.toISOString().slice(11, 16);
                        this.storage.set('checklist-'+this.job['checklists']['Greeting'], JSON.stringify(this.checklistObj));
                        this.checklistService.putChecklist(this.checklistName, this.job['checklists']['Greeting'], this.checklistObj)
                                            .subscribe(res => {});
                    },
                    error => console.log(error)
                    );
            }
        );
      }
      return this.check_out;
    }






}