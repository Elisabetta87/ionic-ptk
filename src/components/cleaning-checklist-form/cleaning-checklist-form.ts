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
  public propertyForm: FormGroup;
  private are_keys_in_there: boolean = false;
  private checklistObj: Object = {};
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
    StorageST.set('checklist-'+this.checklistObj['id'], this.checklistObj).subscribe();
    this.checklist.putChecklist('Cleaning', this.checklistObj['id'], this.checklistObj)
                  .subscribe(() => {this.navCtrl.popTo(CleaningOverviewPage)});
  };

}
