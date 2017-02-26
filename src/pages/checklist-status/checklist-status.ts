import { SpecialRequirementsPage } from './../special-requirements/special-requirements';
import { RubbishInfoPage } from './../rubbish-info/rubbish-info';
import { LinenInfoPage } from './../linen-info/linen-info';
import { PhotosPage } from './../photos/photos';
import { SecureStorage } from 'ionic-native';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Platform } from 'ionic-angular/index';
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
  private enableTickStatus_2: boolean;
  private enableTickStatus_3: boolean;
  private enableTickStatus_3_1: boolean;
  private enableTickStatus_3_2: boolean;
  private enableTickStatus_3_3: boolean;
  private enableTickStatus_3_4: boolean;
  private enableTickStatus_4: boolean;
  private enableTickStatus_5: boolean;
  private enableTickStatus_6: boolean;
  private status: number;
  private complete_clean: boolean = false;
  private check_out: boolean = false;

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private storage: SecureStorage,
    private loadingCtrl: LoadingController,
    private platform: Platform
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
    this.platform.ready().then(() => {
      this.storage.create('status').then(
        () => {
          this.isStorageReady = true; 
          if(this.isStorageReady) {
          this.storage.get('checklistStage-job-'+this.jobId).then(
            res => {
              console.log(res);
              let res_obj = JSON.parse(res);
              this.status = res_obj.status;
              console.log(res_obj);
              switch (this.status) {
                case 2:
                    this.enableTickStatus_2 = true;
                    break;
                case 3.1:
                    this.enableTickStatus_2 = true;
                    this.enableTickStatus_3_1 = true;
                    break;
                case 3.2:
                    this.enableTickStatus_2 = true;
                    this.enableTickStatus_3_1 = true;
                    this.enableTickStatus_3_2 = true;
                    break;   
                case 3.3: 
                    this.enableTickStatus_2 = true;
                    this.enableTickStatus_3_1 = true;
                    this.enableTickStatus_3_2 = true;
                    this.enableTickStatus_3_3 = true;
                    break;
                case 3.4:
                    this.enableTickStatus_2 = true;
                    this.enableTickStatus_3_1 = true;
                    this.enableTickStatus_3_2 = true;
                    this.enableTickStatus_3_3 = true;
                    this.enableTickStatus_3_4 = true;
                    break;
                case 4:
                    this.enableTickStatus_2 = true;
                    this.enableTickStatus_3_1 = true;
                    this.enableTickStatus_3_2 = true;
                    this.enableTickStatus_3_3 = true;
                    this.enableTickStatus_3_4 = true;
                    this.enableTickStatus_4 = true;
                    this.complete_clean = true;
                    break;
                case 5:
                    this.enableTickStatus_2 = true;
                    this.enableTickStatus_3_1 = true;
                    this.enableTickStatus_3_2 = true;
                    this.enableTickStatus_3_3 = true;
                    this.enableTickStatus_3_4 = true;
                    this.enableTickStatus_4 = true;
                    this.enableTickStatus_5 = true;
                    this.complete_clean = true;
                    break;
                case 6:
                    this.enableTickStatus_2 = true;
                    this.enableTickStatus_3_1 = true;
                    this.enableTickStatus_3_2 = true;
                    this.enableTickStatus_3_3 = true;
                    this.enableTickStatus_3_4 = true;
                    this.enableTickStatus_4 = true;
                    this.enableTickStatus_5 = true;
                    this.enableTickStatus_6 = true;
                    this.complete_clean = true;
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
        })
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

  rubbish() {
    this.navCtrl.push(RubbishInfoPage,{
      id: this.id,
      jobId: this.jobId,
      checklistObj: this.checklistObj
    })
  }

  requirements() {
    this.navCtrl.push(SpecialRequirementsPage,{
      id: this.id,
      jobId: this.jobId,
      checklistObj: this.checklistObj
    })
  }

  completeClean() {
    if (this.complete_clean == false) {
      this.complete_clean =  true;
      this.storage = new SecureStorage();
      this.storage.create('completeClean').then(
          ready => {
              this.isStorageReady = true;
              if(this.isStorageReady && this.complete_clean) {
                this.storage.get('checklistStage-job-'+this.jobId).then(
                data => {
                    let obj = JSON.parse(data);
                    obj.status = 4;
                    data = JSON.stringify(obj);
                    this.storage.set('checklistStage-job-'+this.jobId, data);
                    console.log(data);
                },
                error => console.log(error)
                )
            }
          }
      );
    } else {
      this.complete_clean =  false;
    }
    console.log(this.complete_clean);
    return this.complete_clean;
  }

 departureChecklist() {

  }

  checkOut() {
    if (this.check_out == false) {
      this.check_out =  true;
    } else {
      this.check_out =  false;
    }
    console.log(this.check_out);
    /*this.navCtrl.push(ChecklistPage, {
     id: this.id
     });*/
    return this.check_out;
  }

}
