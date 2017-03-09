import { StorageST } from './../../services/StorageST';
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

  private job: Object;
  private checklistName: string;
  private greenBar: string;
  private checklistId:number;
  private checklistObj:Object;
  private status: string;
  private isToggled: boolean;
  private check_out: boolean;
  private current_date: Date = new Date();

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private platform: Platform,
    private checklistService: ChecklistService
  ) {
    this.job = navParams.get('job');
    this.checklistId = navParams.get('checklistId');
    this.checklistName = navParams.get('checklistName');
    this.greenBar = this.checklistId ? 'greenBar' : '';
  }


  ionViewWillEnter() {
    let loading = this.loadingCtrl.create({
        content: 'Please wait...'
    });
    loading.present();
    this.platform.ready().then(() => {
        if(StorageST.getKeys().indexOf('checklist-'+this.checklistId) == -1) {
           this.checklistService.getChecklist(this.checklistName, this.checklistId)
                  .subscribe(checklistObj => {
                      this.checklistObj = checklistObj;
                      this.status = this.checklistObj['stage'];
                      StorageST.set('checklist-'+this.checklistId, checklistObj).subscribe();
                      StorageST.set('checklist-info-'+this.checklistId, this.checklistName).subscribe();
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
        } else {
          StorageST.get('checklist-'+this.checklistId)
                 .subscribe(
                   checklistString => {
                      this.checklistObj = JSON.parse(checklistString);
                      this.status = this.checklistObj['stage'];
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
    })
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
      StorageST.set('checklist-'+this.checklistId, this.checklistObj).subscribe();
    }
  }

  departureChecklist() {
   this.sendToFormComponent(CleaningChecklistSecondPage);
  }

  checkOut() {
    // if (!this.check_out) {
    //   return;
    // }
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
    StorageST.set('checklist-'+this.checklistId, this.checklistObj).subscribe();
  }

  sendToFormComponent(page:any) {
    StorageST.get('checklist-'+this.checklistId)
             .subscribe(
               res => {
                this.checklistObj = JSON.parse(res);
                this.navCtrl.push(page, {checklistObj: this.checklistObj});
               },
               error => this.navCtrl.push(page, {checklistObj: this.checklistObj})
             ) 
  }

}
