import { ChecklistService } from './../../services/checklist';
import { Platform } from 'ionic-angular/index';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChecklistStatusPage } from './../checklist-status/checklist-status';
import { SecureStorage } from 'ionic-native/dist/es5/index';
import { NavController, NavParams } from 'ionic-angular/index';
import { Component, OnInit } from '@angular/core';




@Component({
    selector: 'departure-checklist-page',
    templateUrl: 'complete-departure-checklist.html'
})

export class DepartureChecklistPage implements OnInit {

    private jobId: number;
    private id: number;
    private checklistObj: Object;
    private isStorageReady: boolean;
    private departureChecklistForm: FormGroup;
    private damages_reported: boolean;
    private delivery_during_clean: boolean;
    public checklistTracker: Object = {};

    constructor(
        private fb: FormBuilder,
        private navCtrl: NavController,
        private storage: SecureStorage,
        private navParams: NavParams,
        private platform: Platform,
        private checklist: ChecklistService
    ){
        this.id = navParams.get('id');
        this.jobId = this.navParams.get('jobId');
        this.checklistObj = this.navParams.get('checklistObj');
        this.damages_reported = false;
        this.delivery_during_clean = false;
        this.storage = new SecureStorage();
        platform.ready().then(() => {
        this.storage.create('ptkStorage');
        this.isStorageReady = true;
        })  
    }

    ngOnInit() {
        this.departureChecklistForm = this.fb.group({
            clean_linen_count_end: [this.checklistObj['clean_linen_count_end'] ? this.checklistObj['clean_linen_count_end'] : '', Validators.required],
            dirty_linen_count_end: [this.checklistObj['dirty_linen_count_end'] ? this.checklistObj['dirty_linen_count_end'] : '', [Validators.required]],
                 damages_reported: [this.checklistObj['damages_reported'] ? this.checklistObj['damages_reported'] : false, [Validators.required]],
              damages_description: [this.checklistObj['damages_description'] ? this.checklistObj['damages_description'] : 'Please describe any damages here....'],
            delivery_during_clean: [this.checklistObj['delivery_during_clean'] ? this.checklistObj['delivery_during_clean'] : false, [Validators.required]],
              number_of_beds_made: [this.checklistObj['number_of_beds_made'] ? this.checklistObj['number_of_beds_made'] : '', Validators.required],
                         comments: [this.checklistObj['comments'] ? this.checklistObj['comments'] : 'Leave any comments here......']
        })
    }

    delivery() {
     if (this.delivery_during_clean == false) {
        this.delivery_during_clean =  true;
     } else {
        this.delivery_during_clean =  false;
     }
     return this.delivery_during_clean
    }

    damages() {
     if (this.damages_reported == false) {
        this.damages_reported =  true;
     } else {
        this.damages_reported =  false;
     }
     return this.damages_reported
    }



    onSubmit() {
        let departureChecklist = this.departureChecklistForm.value;
        this.checklistObj['clean_linen_count_end'] = departureChecklist['clean_linen_count_end'];
        this.checklistObj['dirty_linen_count_end'] = departureChecklist['dirty_linen_count_end'];
        this.checklistObj['damages_reported'] = departureChecklist['damages_reported'];
        console.log(departureChecklist['damages_description'], departureChecklist['comments']);
        let damage_description = departureChecklist['damages_description']; 
        let comments = departureChecklist['comments'];
        this.checklistObj['damages_description'] = departureChecklist['damages_description'] != 'Please describe any damages here....' ? damage_description : '';
        this.checklistObj['delivery_during_clean'] = departureChecklist['delivery_during_clean'];
        this.checklistObj['number_of_beds_made'] = departureChecklist['number_of_beds_made'];
        this.checklistObj['comments'] = departureChecklist['comments'] != 'Leave any comments here......' ? comments : '';
        console.log(this.checklistObj);
        this.checklistTracker['job'] = this.checklistObj['job'];
        this.checklistTracker['status'] = 5;
        this.checklistTracker['id'] = this.id;
        let stringifyTracker = JSON.stringify(this.checklistTracker);
        let stringifyForm = JSON.stringify(this.checklistObj);
        let checklist = 'checklist-'+this.id;
        if (this.isStorageReady) {
        this.storage.set(checklist, stringifyForm);
        this.storage.set('checklistStage-job-'+this.jobId, stringifyTracker).then(res => console.log(res));
        console.log(this.id);
        this.checklist.putChecklist('service name', this.id, this.checklistObj)
                      .subscribe(res => {
                        this.navCtrl.popTo(ChecklistStatusPage);
                      });
        }
    }
}