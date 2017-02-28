import { UpdateChecklist } from './../../services/update-checklist';
import { DepartureChecklistPage } from './../complete-departure-checklist/complete-departure-checklist';
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
  private isToggled: boolean;
  private check_out: boolean;
  private current_date: Date = new Date();

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private storage: SecureStorage,
    private loadingCtrl: LoadingController,
    private platform: Platform,
    private updateChecklist: UpdateChecklist
  ) {
    this.id = navParams.get('id');
    this.jobId = navParams.get('jobId');
    this.services = navParams.get('services');
    this.checklistObj = navParams.get('checklistObj');
    this.greenBar = this.id ? 'greenBar' : '';
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
          this.storage.get('checklistStage-job-'+this.jobId).then(
            res => {
              let res_obj = JSON.parse(res);
              this.status = res_obj.status;
              console.log(res_obj, this.status);
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
                    this.isToggled = true;
                    break;
                case 5:
                    this.enableTickStatus_2 = true;
                    this.enableTickStatus_3_1 = true;
                    this.enableTickStatus_3_2 = true;
                    this.enableTickStatus_3_3 = true;
                    this.enableTickStatus_3_4 = true;
                    this.enableTickStatus_4 = true;
                    this.enableTickStatus_5 = true;
                    this.isToggled = true;
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
                    this.isToggled = true;
                    this.check_out = true;
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
    if (this.isToggled) {
      this.storage = new SecureStorage();
      this.storage.create('ptkStorage').then(
          ready => {
              this.isStorageReady = true;
              if(this.isStorageReady) {
                this.storage.get('checklistStage-job-'+this.jobId).then(
                data => {
                    let obj = JSON.parse(data);
                    if(obj.status == 3.4) {
                        obj['status'] = 4;  
                        console.log(obj);         
                        this.storage.set('checklistStage-job-'+this.jobId, JSON.stringify(obj)).then(res => console.log(res));
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

 departureChecklist() {
    this.navCtrl.push(DepartureChecklistPage, {
      id: this.id,
      jobId: this.jobId,
      checklistObj: this.checklistObj
    })
  }

  checkOut() {
    if (this.check_out) {
      this.storage = new SecureStorage();
      this.storage.create('ptkStorage').then(
          ready => {
                this.storage.get('checklistStage-job-'+this.jobId).then(
                data => {
                    let obj = JSON.parse(data);
                    obj.status = 6;
                    this.storage.set('checklistStage-job-'+this.jobId, data);
                    this.checklistObj['check_out_stamp'] = this.current_date.toISOString().slice(0,10) + ' ' + this.current_date.toISOString().slice(11, 16);
                    let stringifyObj= JSON.stringify(this.checklistObj);
                    let checklist = 'checklist-'+this.id;
                    this.storage.set(checklist, stringifyObj);
                    this.storage.set('checklistStage-job-'+this.jobId, JSON.stringify(obj)).then(res => console.log(res));
                    this.updateChecklist.putChecklist(this.id, this.checklistObj)
                                        .subscribe(res => {
                                            //this.navCtrl.popTo(ChecklistStatusPage);
                                            console.log(res);
                                        });
                },
                error => console.log(error)
                );
          }
      );
    }
    return this.check_out;
  }

}
