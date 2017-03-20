import { ChecklistOverviewPage } from './../checklist-overview/checklist-overview';
import { StorageST } from './../../services/StorageST';
import { ChecklistService } from './../../services/checklist';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeolocationService } from '../../services/geolocation-service';
import { NavController, NavParams, Platform } from 'ionic-angular/index';
import { ChecklistSecondPage } from '../../pages/checklist-second/checklist-second';

@Component({
  selector: 'checklist-section',
  templateUrl: 'checklist-section.html'
})
export class ChecklistSectionPage implements OnInit {

  private job: Object;
  private checklistObj: Object = {};
  private checklistName: string;
  private checklistId: number;
  private sectionInfo: Object = {};
  private sectionFields: Object = {};
  private sectionForm: FormGroup;
  private sectionFormBuilder: Object = {};
  private fields:any = [];

  //private platformReady: boolean;

  constructor(
    public navCtrl: NavController,
    private fb: FormBuilder,
    private geoService: GeolocationService,
    private navParams: NavParams,
    private checklist: ChecklistService,
    private platform: Platform
  ) {
    this.checklistObj = navParams.get('checklistObj');
    this.sectionInfo = navParams.get('section');
    this.checklistName = navParams.get('checklistName');
    this.checklistId = navParams.get('checklistId');

    // platform.ready().then(() => {this.platformReady = true)})
    // remember to update service fix
    console.log(this.checklistName, this.checklistObj['id'], this.checklistId);

    this.sectionFields = this.sectionInfo['section_fields'][0];
    for(let e in this.sectionFields) {
      this.fields.push({
        field: e,
        fieldName: this.sectionFields[e]['name'],
        fieldType: this.sectionFields[e]['type'],
      });
    };
  }

  ngOnInit(){
    for(let key in this.sectionFields) {
      switch (this.sectionFields[key]['type']) {
        case 'boolean': {
          this.sectionFormBuilder[key] = [this.checklistObj[key] ? this.checklistObj[key] : false, Validators.required];
          break;
        }
        case 'number': {
          this.sectionFormBuilder[key] = [this.checklistObj[key] ? this.checklistObj[key] : '', Validators.required];
          break;
        }
        case 'text': {
          this.sectionFormBuilder[key] = [this.checklistObj[key] ? this.checklistObj[key] : '', [Validators.required]];
          break;
        }
      }
    }   
    this.sectionForm = this.fb.group(this.sectionFormBuilder);
  }

  onSubmit() {
    for(let e in this.sectionForm.value) {
      this.checklistObj[e] = this.sectionForm.value[e];
    };
    if (+this.checklistObj['stage'] <= +this.sectionInfo['section_stage']) {
      this.checklistObj['stage'] = (+this.sectionInfo['section_stage']+1).toString();
    }
    StorageST.set('checklist-'+this.checklistObj['id'], this.checklistObj).subscribe();
    this.checklist.putChecklist(this.checklistName, this.checklistId, this.checklistObj)
      .subscribe(() => {this.navCtrl.popTo(ChecklistOverviewPage)});
  };

  // generateFieldName(name:string) {
  //   let fieldName = name.replace(/_/g,' ');
  //   return fieldName.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  // }

}


 



