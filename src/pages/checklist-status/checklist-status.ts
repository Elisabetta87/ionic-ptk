import { LinenInfoPage } from './../linen-info/linen-info';
import { PhotosPage } from './../photos/photos';
import { SecureStorage } from 'ionic-native';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular/index';
import {ChecklistPage} from "../checklist/checklist";



@Component({
  selector: 'page-checklist-status',
  templateUrl: 'checklist-status.html'
})
export class ChecklistStatusPage {

  private id: number;
  private jobId: number;
  private services: string;
  private greenBar: string;
  private checklistObj: Object;
  private isStorageReady: boolean;
  private enableTickStatus: boolean;
  private status: number;

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private storage: SecureStorage,
    private loadingCtrl: LoadingController
  ) {
    this.id = navParams.get('id');
    this.jobId = navParams.get('jobId');
    this.services = navParams.get('services');
    this.checklistObj = navParams.get('checklistObj');
    this.greenBar = this.id ? 'greenBar' : '';
  }


  ionViewWillEnter() {
    let loading = this.loadingCtrl.create({
        content: 'Please wait...'
    });
    loading.present();
    this.storage = new SecureStorage();
    this.storage.create('status').then(
      () => {
        this.isStorageReady = true; 
        if(this.isStorageReady) {
        this.storage.get('checklistStage-job-'+this.jobId).then(
          res => {
            let res_obj = JSON.parse(res);
            this.status = res_obj.status;
            console.log(res_obj, this.status);
             switch (this.status) {
               case 2:
                  this.enableTickStatus = true;
                  break;
               case 3.1:
                  this.enableTickStatus = true;
                  break;
               case 3.2:
                  this.enableTickStatus = true;
                  break;   
               case 3.3: 
                  this.enableTickStatus = true;
                  break;
               case 3.4:
                  this.enableTickStatus = true;
                  break;
               case 4:
                  this.enableTickStatus = true;
                  break;
               case 5:
                  this.enableTickStatus = true;
                  break;
               case 6:
                  this.enableTickStatus = true;
                  break;   
               default:
                  console.log(this.status);
                  break;                   
            }            
          },
          error => {
            console.log(error);
          }
          );
    } 
        loading.dismiss();
      });
  } 



  checklist() {
    this.navCtrl.push(ChecklistPage, {
     id: this.id,
     jobId: this.jobId,
     checklistObj: this.checklistObj
     });
  }

  photos() {
    this.navCtrl.push(PhotosPage, {
      id: this.id,
      jobId: this.jobId,
      checklistObj: this.checklistObj
    })
  }

  linen() {
    this.navCtrl.push(LinenInfoPage, {
      id: this.id,
      jobId: this.jobId,
      checklistObj: this.checklistObj
    })
  }

  completeChecklist() {
    /*this.navCtrl.push(ChecklistPage, {
     id: this.id
     });*/

  }


}
