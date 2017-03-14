import { XHRBackend } from '@angular/http';
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
  selector: 'test-page',
  templateUrl: 'test.html'
})
export class TestPage {

  //private job: Object;
  private checklistName: string;
  private greenBar: string;
  private checklistId:number;
  private checklistObj:Object;
  private status: string;
  private checklistBool: boolean;
  private checkOut: boolean;
  private checklistBoolStage: number;
  private checkOutStage: number;
  private current_date: Date = new Date();
  private checklistInfo:Object;

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private platform: Platform,
    private checklistService: ChecklistService
  ) {
    //this.job = navParams.get('job');
    this.checklistId = 721;
    this.checklistName = 'Cleaning';
    this.greenBar = this.checklistId ? 'greenBar' : '';
    this.checklistInfo = {
        'sections': [
            {
                'section_name': 'Check-In',
                'section_type': 'Check-In',
                'section_fields': [{
                    'check_in_stamp': {
                        'name': 'Check-In',
                        'type': 'datetime',
                    },
                }],
                'section_stage': '1',
            },
            {
                'section_name': 'Arrival Checklist',
                'section_type': 'Questions',
                'section_fields': [{
                    'keys_in_keysafe': {
                        'name': 'Are The Keys In The Keysafe?',
                        'type': 'boolean',
                    },
                    'dirty_linen_count_start': {
                        'name': 'How Many Dirty Linens Are There?',
                        'type': 'number',
                    },
                    'clean_linen_count_start': {
                        'name': 'How Many Clean Linens Are There?',
                        'type': 'number',
                    }
                }],
                'section_stage': '2',
            },
            // {
            //     'section_name': 'Learn',
            //     'section_type': 'Property Info',
            //     'section_fields': [],
            //     'section_stage': '3',
            // },
            {
                'section_name': 'Complete Clean',
                'section_type': 'Checklist Boolean',
                'section_fields': [],
                'section_stage': '4',
            },
            {
                'section_name': 'Departure Checklist',
                'section_type': 'Questions',
                'section_fields': [{
                    'dirty_linen_count_end': {
                        'name': 'How Many Dirty Linens Are There?',
                        'type': 'number',
                    },
                }], // more fields needed here!
                'section_stage': '5',
            },
            {
                'section_name': 'Check-Out',
                'section_type': 'Check-Out',
                'section_fields': [{
                    'check_out_stamp': {
                        'name': 'Check-Out',
                        'type': 'datetime',
                    },
                }],
                'section_stage': '6',
            },
        ]
    }
  }


  ionViewWillEnter() {
    let loading = this.loadingCtrl.create({
        content: 'Please wait...'
    });
    loading.present();
    for (let e in this.checklistInfo['sections']) {
        if (e['section_type'] == 'Checklist Boolean') {
            this.checklistBoolStage = +e['section_stage'];
        }
        if (e['section_type'] == 'Check-Out') {
            this.checkOutStage = +e['section_stage'];
        }
    }
    this.platform.ready().then(() => {
        if(StorageST.getKeys().indexOf('checklist-'+this.checklistId) == -1) {
           this.checklistService.getChecklist(this.checklistName, this.checklistId)
                  .subscribe(checklistObj => {
                      this.checklistObj = checklistObj;
                      this.status = this.checklistObj['stage'];
                      StorageST.set('checklist-'+this.checklistId, checklistObj).subscribe();
                      StorageST.set('checklist-info-'+this.checklistId, this.checklistName).subscribe();
                      if (+this.status>=this.checklistBoolStage) {
                        this.checklistBool = true;
                      } else {
                        this.checklistBool = false;
                      }
                      if(+this.status==this.checkOutStage) {
                        this.checkOut = true;
                      } else {
                        this.checkOut = false;
                      }
                      loading.dismiss();
                  })
        } else {
          StorageST.get('checklist-'+this.checklistId)
                 .subscribe(
                   checklistString => {
                      this.checklistObj = JSON.parse(checklistString);
                      this.status = this.checklistObj['stage'];
                      if (+this.status>=this.checklistBoolStage) {
                        this.checklistBool = true;
                      } else {
                        this.checklistBool = false;
                      }
                      if(+this.status==this.checkOutStage) {
                        this.checkOut = true;
                      } else {
                        this.checkOut = false;
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
    if (!this.checklistBool) {
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

  toggleCheckOut() {
    // if (!this.checkOut) {
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
