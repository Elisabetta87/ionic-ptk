import { CleaningOverviewPage } from './../../pages/cleaning-overview/cleaning-overview';
import { ChecklistService } from './../../services/checklist';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { GeolocationService } from '../../services/geolocation-service';
import { NavController, NavParams, Platform } from 'ionic-angular/index';
import { ChecklistSecondPage } from '../../pages/checklist-second/checklist-second';
import { SecureStorage } from 'ionic-native';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/fromPromise';
import {Subject} from "rxjs/Subject";




@Component({
  selector: 'cleaning-checklist-form',
  templateUrl: 'cleaning-checklist-form.html'
})

export class CleaningChecklistForm implements OnInit {

  private id: string;
  private jobId: number;
  public propertyForm: FormGroup;
  private are_keys_in_there: boolean = false;
  private checklistObj: Object = {};
  private isStorageReady: boolean;
  private service:string;

  constructor(
    public navCtrl: NavController,
    private fb: FormBuilder,
    private geoService: GeolocationService,
    private storage: SecureStorage,
    private navParams: NavParams,
    private checklist: ChecklistService,
    private platform: Platform
  ) {
    this.id = navParams.get('id');
    this.jobId = navParams.get('jobId');
    this.service = navParams.get('services');
    this.checklistObj = navParams.get('checklistObj');
    
    this.storage = new SecureStorage();
    platform.ready().then(() => {
      this.storage.create('ptkStorage');
      this.isStorageReady = true;
    })
  }

   ngOnInit(){
     this.propertyForm = this.fb.group({
        keys_in_keysafe: [this.checklistObj['keys_in_keysafe'] ? this.checklistObj['keys_in_keysafe'] : false, Validators.required],
        dirty_linen_count_start: [this.checklistObj['dirty_linen_count_start'] ? this.checklistObj['dirty_linen_count_start'] : '', [Validators.required]],
        clean_linen_count_start: [this.checklistObj['clean_linen_count_start'] ? this.checklistObj['clean_linen_count_start'] : '', [Validators.required]]
     }); 
  }

  notify() {
    if (this.are_keys_in_there == false) {
      this.are_keys_in_there =  true;
    } else {
      this.are_keys_in_there =  false;
    }
    return this.are_keys_in_there;
  }

  onSubmit() {
    let arrivalChecklist = this.propertyForm.value;
    this.checklistObj['keys_in_keysafe'] = arrivalChecklist['keys_in_keysafe'];
    this.checklistObj['clean_linen_count_start'] = arrivalChecklist['clean_linen_count_start'];
    this.checklistObj['dirty_linen_count_start'] = arrivalChecklist['dirty_linen_count_start'];
    this.checklistObj['stage'] = '2';
    this.checklistObj['job'] = this.jobId;
    let stringifyForm = JSON.stringify(this.checklistObj);
    let checklist = 'checklist-'+this.id;
    console.log(Object.keys(this.checklistObj)[0]);
    if (this.isStorageReady) {
      this.storage.set(checklist, stringifyForm).then(res => console.log(res));
      this.checklist.putChecklist(Object.keys(this.checklistObj)[0], this.id, this.checklistObj)
                    .subscribe(res => {
                      console.log(res);
                      this.navCtrl.popTo(CleaningOverviewPage);
                    });
    }
  };


}
