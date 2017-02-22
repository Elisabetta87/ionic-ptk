import { ChecklistStatusPage } from './../../pages/checklist-status/checklist-status';
import { UpdateChecklist } from './../../services/update-checklist';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { GeolocationService } from '../../services/geolocation-service';
import { NavController, NavParams } from 'ionic-angular/index';
import { ChecklistSecondPage } from '../../pages/checklist-second/checklist-second';
import { SecureStorage } from 'ionic-native';




@Component({
  selector: 'checklist-form',
  templateUrl: 'checklist-form.html'
})

export class PropertyForm implements OnInit {

  private id: string;
  private jobId: number;
  public propertyForm: FormGroup;
  private are_keys_in_there: boolean = false;
  private checklistObj: Object;
  private checklistTracker: Object = {};

  constructor(
    public navCtrl: NavController,
    private fb: FormBuilder,
    private geoService: GeolocationService,
    private storage: SecureStorage,
    private navParams: NavParams,
    private updateChecklist: UpdateChecklist
  ) {
    this.id = navParams.get('id');
    this.jobId = navParams.get('jobId');
    this.checklistObj = navParams.get('checklistObj');
    this.storage = new SecureStorage();
    this.storage.create('form');
    console.log(this.id);
  }

  ngOnInit(){
    //console.log(this.checklistObj);
// setting validators for propertyForm
    this.propertyForm = this.fb.group({
      keys_in_keysafe: [false, Validators.required],
      dirty_linen_count_start: ['', [Validators.required]],
      clean_linen_count_start: ['', [Validators.required]]
    });

  }
  notify() {
    if (this.are_keys_in_there == false) {
      this.are_keys_in_there =  true;
    } else {
      this.are_keys_in_there =  false;
    }
    console.log(this.are_keys_in_there);
    return this.are_keys_in_there;
  }

  // capitalise(s:boolean) {
  //   let str = s.toString();	
  //   return str[0].toUpperCase() + str.slice(1);
  // }

// when submit the form user goes to a  new page propertyDetailsPage
  onSubmit() {
    // console.log(this.propertyForm.value);
    //this.propertyForm.value['stage'] = '2';
    let arrivalChecklist = this.propertyForm.value;
    this.checklistObj['keys_in_keysafe'] = arrivalChecklist['keys_in_keysafe'];
    this.checklistObj['clean_linen_count_start'] = arrivalChecklist['clean_linen_count_start'];
    this.checklistObj['dirty_linen_count_start'] = arrivalChecklist['dirty_linen_count_start'];
    this.checklistTracker['job'] = this.checklistObj['job'];
    this.checklistTracker['status'] = 2;
    let stringifyTracker = JSON.stringify(this.checklistTracker);
    let stringifyForm = JSON.stringify(this.checklistObj);
    let checklist = 'checklist-'+this.id;
    this.storage.set(checklist, stringifyForm);
    this.storage.set('checklistStage-job-'+this.jobId, stringifyTracker);
    this.updateChecklist.putChecklist(this.id, this.checklistObj, {withCredentials: ''})
                        .subscribe(res => {
                          console.log('successfully updated');
                        });
    this.navCtrl.popTo(ChecklistStatusPage);

  };


}
