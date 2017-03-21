import { PropertyInfoService } from './../../services/propertyInfo';
import { ChecklistInfo } from './../../services/checklistInfo';
import { PropertyInfoPage } from './../property-info/property-info';
import { ChecklistSectionPage } from './../checklist-section/checklist-section';
import { StorageST } from './../../services/StorageST';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Platform } from 'ionic-angular/index';
//My Imports
import { ChecklistService } from './../../services/checklist';
import { SpecialRequirementsPage } from './../special-requirements/special-requirements';
import { RubbishInfoPage } from './../rubbish-info/rubbish-info';
import { LinenInfoPage } from './../linen-info/linen-info';
import { PhotosPage } from './../photos/photos';
import { GreetingOverviewPage } from './../greeting-overview/greeting-overview';
import { JobDetailsPage } from './../job-details/job-details';


@Component({
  selector: 'checklist-overview-page',
  templateUrl: 'checklist-overview.html'
})
export class ChecklistOverviewPage {

  private job: Object;
  private checklistName: string;
  private checklistId:number;
  private checklistObj:Object;
  private checklistInfoDict:Object;
  private checklistInfo:Object;
  private propertyInfo:Object;
  private stage: number;
  private checklistBool: boolean;
  private checkOut: boolean;
  private checklistBoolStage: number;
  private checkOutStage: number;
  private propertyInfoStage: number;
  private current_date: Date = new Date();
  private propertyInfoHeightClass: string;
  
  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private platform: Platform,
    private checklistService: ChecklistService,
    private checklistInfoService: ChecklistInfo,
    private propertyInfoService: PropertyInfoService
  ) {
    this.job = navParams.get('job');
    this.checklistName = navParams.get('checklistName');
    this.checklistId = navParams.get('checklistId');
    //import service to use checklistInfoDict and PropertyInfoService
    this.checklistInfoDict = this.checklistInfoService.checklistInfo();
    this.checklistInfo = this.checklistInfoDict[this.checklistName];
    this.propertyInfo = this.propertyInfoService.propertyInfoObj();
   
    //this.propertyInfoHeightClass = 'extra-height-'+this.propertyInfo['info'].length.toString();
    //console.log(this.propertyInfoHeightClass);
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
            StorageST.set('checklist-'+this.checklistId, this.checklistObj).subscribe();
            StorageST.set('checklist-info-'+this.checklistId, this.checklistName).subscribe();
            this.setStage();
            this.setPropertyInfoPageStages();
            loading.dismiss();
          })
      } else {
        StorageST.get('checklist-'+this.checklistId)
          .subscribe(checklistString => {
              this.checklistObj = JSON.parse(checklistString);
              this.setStage();
              this.setPropertyInfoPageStages();
              loading.dismiss();
          })      
      }
    })
  // also get the checklistInfo
  // also get the propertyInfo
  }

  setStage() {
    this.stage = +this.checklistObj['stage'];
    for (let e in this.checklistInfo['sections']) {
        if (this.checklistInfo['sections'][e]['section_type'] == 'Checklist Boolean') {
          this.checklistBoolStage = +this.checklistInfo['sections'][e]['section_stage'];
        }
        if (this.checklistInfo['sections'][e]['section_type'] == 'Check-Out') {
          this.checkOutStage = +this.checklistInfo['sections'][e]['section_stage'];
        }
        if (this.checklistInfo['sections'][e]['section_type'] == 'Property Info') {
          this.propertyInfoStage = +this.checklistInfo['sections'][e]['section_stage'];
        }
    }
    if (this.stage>this.checklistBoolStage) {
      this.checklistBool = true;
    } else {
      this.checklistBool = false;
    }
    if(this.stage>this.checkOutStage) {
      this.checkOut = true;
    } else {
      this.checkOut = false;
    }
  }

  setPropertyInfoPageStages() {
    for (let page of this.propertyInfo['info']) {
      let pageIndex = this.propertyInfo['info'].indexOf(page);
      let pageStage = this.propertyInfoStage + (pageIndex)/10;
      this.propertyInfo['info'][pageIndex]['page_stage'] = pageStage.toString();
    }
  }

  redirectToSection(section) {
    this.navCtrl.push(ChecklistSectionPage, {
      checklistObj : this.checklistObj,
      checklistName: this.checklistName,
      checklistId: this.checklistId,
      section      : section,
    }) 
  }

  redirectToPropertyInfoPage(page) {
    this.navCtrl.push(PropertyInfoPage, {
      checklistObj: this.checklistObj,
      propertyInfo: this.propertyInfo,
      page: page,
    }) 
  }

  toggleChecklistBool() { // only possible from false -> true, as disbaled in HTML otherwise
    this.stage = this.checklistBoolStage + 1;
    this.checklistObj['stage'] = this.stage.toString();
    StorageST.set('checklist-'+this.checklistId, this.checklistObj).subscribe();
  }

  toggleCheckOut() { // only possible from false -> true, as disbaled in HTML otherwise
    this.stage = this.checkOutStage + 1;
    this.checklistObj['stage'] = this.stage.toString();
    this.checklistObj['check_out_stamp'] = this.current_date.toISOString().slice(0,10) + ' ' + this.current_date.toISOString().slice(11, 16);
    StorageST.set('checklist-'+this.checklistId, this.checklistObj).subscribe();
    this.checklistService.putChecklist(this.checklistName, this.checklistId, this.checklistObj)
      .subscribe(res => {
          // for(let checklistName in this.job['checklists']) { // actually, need to check storage to see if checklist has been completed or not ... and, if all completed, go to job-details
          //   if(checklistName !== this.checklistName) {
          //     let checklistId = this.job['checklists'][checklistName];
          //     this.navCtrl.push(ChecklistOverviewPage, {
          //                 job: this.job,
          //       checklistName: checklistName,
          //         checklistId: checklistId
          //     })
          //   }
          // }
          this.navCtrl.popTo(JobDetailsPage);
      });
  }

}
