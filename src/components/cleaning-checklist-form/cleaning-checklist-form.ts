import { StorageST } from './../../services/StorageST';
import { CleaningOverviewPage } from './../../pages/cleaning-overview/cleaning-overview';
import { ChecklistService } from './../../services/checklist';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeolocationService } from '../../services/geolocation-service';
import { NavController, NavParams, Platform } from 'ionic-angular/index';
import { ChecklistSecondPage } from '../../pages/checklist-second/checklist-second';


@Component({
  selector: 'cleaning-checklist-form',
  templateUrl: 'cleaning-checklist-form.html'
})

export class CleaningChecklistForm implements OnInit {

  private job: Object;
  private checklistObj: Object = {};
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

    // platform.ready().then(() => {this.platformReady = true)})
    // remember to update service fix

    this.sectionInfo = { // this will be passed through from checklist-overview page
      'section_name': 'Arrival Checklist',
      'section_type': 'Checklist',
      'section_fields': {
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
      },
      'section_stage': '2',
    }
    this.sectionFields = this.sectionInfo['section_fields'];
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
      switch (this.sectionFields[key]) {
        case 'boolean': {
          this.sectionFormBuilder[key] = [this.checklistObj[key] ? this.checklistObj[key] : false, Validators.required];
          break;
        }
        case 'number': {
          this.sectionFormBuilder[key] = [this.checklistObj[key] ? this.checklistObj[key] : '', Validators.required];
          break;
        }
        case 'number': {
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
    this.checklistObj['stage'] = this.sectionInfo['section_stage'];
    StorageST.set('checklist-'+this.checklistObj['id'], this.checklistObj).subscribe();
    this.checklist.putChecklist('Cleaning', this.checklistObj['id'], this.checklistObj)
      .subscribe(() => {this.navCtrl.popTo(CleaningOverviewPage)});
  };

  // generateFieldName(name:string) {
  //   let fieldName = name.replace(/_/g,' ');
  //   return fieldName.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  // }

}
