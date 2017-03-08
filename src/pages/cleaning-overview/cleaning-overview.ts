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
import { GreetingOverviewPage } from './../greeting-overview/greeting-overview';
import { JobDetailsPage } from './../job-details/job-details';




@Component({
  selector: 'cleaning-overview',
  templateUrl: 'cleaning-overview.html'
})
export class CleaningOverviewPage {

  //private id: number;
  private job: Object;
  //private jobId: number;
  private checklistName: string;
  //private service: string = '';
  private greenBar: string;
  private checklistId:number;
  private checklistObj:Object;

  private isStorageReady: boolean;
  private status: string;
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
    // this.id = navParams.get('id');
    // this.jobId = navParams.get('jobId');
    this.job = navParams.get('job');
    console.log(this.job);
    this.checklistId = navParams.get('checklistId');
    this.checklistName = navParams.get('checklistName');
    this.greenBar = this.checklistId ? 'greenBar' : '';
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
          this.storage.get('checklist-'+this.checklistId).then(
            checklistString => {
              this.checklistObj = JSON.parse(checklistString);
              console.log(this.checklistObj);
              this.status = this.checklistObj['stage'];
              console.log(this.status);
              if (+this.status>=4) {
                this.isToggled = true;
              } else {
                this.isToggled = false;
              }
              if(+this.status==6) {
                this.check_out = true;
              } else {
                this.check_out = false;
              }
              loading.dismiss();
            },
            error => {
              console.log(error);
              this.checklistService.getChecklist(this.checklistName, this.checklistId)
                .subscribe(checklistObj => {
                  console.log(checklistObj);
                  this.checklistObj = checklistObj;
                  this.storage.set('checklist-'+this.checklistId, JSON.stringify(checklistObj));
                  this.storage.set('checklist-info-'+this.checklistId, this.checklistName); 
                  this.status = checklistObj['stage'];
                  if (+this.status>=4) {
                    this.isToggled = true;
                  } else {
                    this.isToggled = false;
                  }
                  if(+this.status==6) {
                    this.check_out = true;
                  } else {
                    this.check_out = false;
                  }
                  loading.dismiss();
                })
            }
          ); 
        }
      )
    });
  } 

  checklist() {
    this.sendToFormComponent(CleaningChecklistPage);
  }

  photos() {
    this.navCtrl.push(PhotosPage, {
      checklistObj: this.checklistObj
    })
  }

  linen() {
    this.navCtrl.push(LinenInfoPage, {
      checklistObj: this.checklistObj
    })
  }

  rubbish() {
    this.navCtrl.push(RubbishInfoPage,{
      checklistObj: this.checklistObj
    })
  }

  requirements() {
    this.navCtrl.push(SpecialRequirementsPage,{
      checklistObj: this.checklistObj
    })
  }

  completeClean() {
    if (!this.isToggled) {
      return;
    }
    if (+this.checklistObj['stage'] < 4) {
      this.checklistObj['stage'] = '4';
      if(this.isStorageReady) {      
        this.storage.set('checklist-'+this.checklistId, JSON.stringify(this.checklistObj)).then(res => console.log(res));
      } else {
        console.log('completeClean() - storage not ready');
        // do we need action here? And, if not, is this if statement needed at all?
      }
    }
  }

  departureChecklist() {
   this.sendToFormComponent(CleaningChecklistSecondPage);
  }

  checkOut() {
    if (!this.check_out) {
      return;
    }
    this.checklistObj['stage'] = '6';
    this.checklistObj['check_out_stamp'] = this.current_date.toISOString().slice(0,10) + ' ' + this.current_date.toISOString().slice(11, 16);
    this.checklistService.putChecklist(this.checklistName, this.checklistId, this.checklistObj)
      .subscribe(res => {
          // for(let checklistName in this.job['checklists']) {
          //   if(checklistName !== this.checklistName) {
          //     this.navCtrl.push(checklistName+'OverviewPage', {
          //                   job: this.job,
          //         checklistName: checklistName,
          //           checklistId: this.job['checklists']['checklistName']
          //     });
          //   }
          // }
          this.navCtrl.popTo(JobDetailsPage);
      });
    if(this.isStorageReady) {      
      this.storage.set('checklist-'+this.checklistId, JSON.stringify(this.checklistObj));
    } else {
      console.log('checkOut() - storage not ready')
      // do we need action here? And, if not, is this if statement needed at all?
    }
  }

  sendToFormComponent(page:any) {
    if(this.isStorageReady) {
      this.storage.get('checklist-'+this.checklistId).then(
        res => {
          this.checklistObj = JSON.parse(res);
          this.navCtrl.push(page, {
            checklistObj: this.checklistObj
          });
          
        },
        error => {
          this.navCtrl.push(page, {
            checklistObj: this.checklistObj
          });
        }
      )
    } 
  }

}
