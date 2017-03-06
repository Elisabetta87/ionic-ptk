import { SecureStorage } from 'ionic-native';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Platform } from 'ionic-angular/index';
//My Imports
import { ChecklistService } from './../../services/checklist';
import { CleaningChecklistSecondPage } from './../cleaning-checklist-2/cleaning-checklist-2';
import { CleaningChecklistPage } from './../cleaning-checklist/cleaning-checklist';
import { SpecialRequirementsPage } from './../special-requirements/special-requirements';
import { RubbishInfoPage } from './../rubbish-info/rubbish-info';
import { LinenInfoPage } from './../linen-info/linen-info';
import { PhotosPage } from './../photos/photos';


@Component({
  selector: 'cleaning-overview',
  templateUrl: 'cleaning-overview.html'
})
export class CleaningOverviewPage {

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
    private checklistService: ChecklistService
  ) {
    this.id = navParams.get('id');
    this.jobId = navParams.get('jobId');
    this.checklistObj = navParams.get('checklistObj');
    this.services = navParams.get('service');
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
          this.storage.get('checklist-'+this.id).then(
            res => {
              let res_obj = JSON.parse(res);
              this.status = res_obj.stage;
              console.log(+this.status);
               if (+this.status>=4) {
                  this.isToggled = true;
               } else if(+this.status==6) {
                 console.log('ciao');
                  this.isToggled = true;
                  this.check_out = true;
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
    this.sendToFormComponent(CleaningChecklistPage);
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
                this.storage.get('checklist-'+this.id).then(
                data => {
                    let obj = JSON.parse(data);
                    if(obj.stage == '3.4') {
                        obj['stage'] = '4';  
                        console.log(obj);         
                        this.storage.set('checklist-'+this.id, JSON.stringify(obj)).then(res => console.log(res));
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
   this.sendToFormComponent(CleaningChecklistSecondPage);
 }

  checkOut() {
    if (this.check_out) {
      this.storage = new SecureStorage();
      this.storage.create('ptkStorage').then(
          ready => {
                this.storage.get('checklist-'+this.id).then(
                data => {
                    let obj = JSON.parse(data);
                    obj.stage = '6';
                    this.storage.set('checklist-'+this.id, data);
                    this.checklistObj['stage'] = '6';
                    this.checklistObj['job'] = this.jobId;
                    this.checklistObj['check_out_stamp'] = this.current_date.toISOString().slice(0,10) + ' ' + this.current_date.toISOString().slice(11, 16);
                    let stringifyObj= JSON.stringify(this.checklistObj);
                    let checklist = 'checklist-'+this.id;
                    this.storage.set(checklist, stringifyObj);
                    //this.storage.set('checklistStage-job-'+this.jobId, JSON.stringify(obj)).then(res => console.log(res));
                    this.checklistService.putChecklist(Object.keys(this.checklistObj)[0], this.id, this.checklistObj)
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


  sendToFormComponent(page:any) {
    if(this.isStorageReady) {
      this.storage.get('checklist-'+this.id).then(
        res => {
          this.checklistObj = JSON.parse(res);
          this.navCtrl.push(page, {
            id: this.id,
            jobId: this.jobId,
            checklistObj: this.checklistObj
          });
          
        },
        error => {
          this.navCtrl.push(page, {
            id: this.id,
            jobId: this.jobId,
            checklistObj: this.checklistObj
          });
        }
      )
    } 
  }




}
