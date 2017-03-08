import { CleaningOverviewPage } from './../cleaning-overview/cleaning-overview';
import { ChecklistService } from './../../services/checklist';
import { Platform } from 'ionic-angular/index';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SecureStorage } from 'ionic-native/dist/es5/index';
import { NavController, NavParams } from 'ionic-angular/index';
import { Component, OnInit } from '@angular/core';




@Component({
    selector: 'cleaning-checklist-2',
    templateUrl: 'cleaning-checklist-2.html'
})

export class CleaningChecklistSecondPage implements OnInit {

    private checklistObj: Object;
    private isStorageReady: boolean;
    private departureChecklistForm: FormGroup;
    private damages_reported: boolean;
    private delivery_during_clean: boolean;

    constructor(
        private fb: FormBuilder,
        private navCtrl: NavController,
        private storage: SecureStorage,
        private navParams: NavParams,
        private platform: Platform,
        private checklist: ChecklistService
    ){
        this.checklistObj = this.navParams.get('checklistObj');
        this.damages_reported = false;
        this.delivery_during_clean = false;
        this.storage = new SecureStorage();
        platform.ready().then(() => {
          this.storage.create('ptkStorage').then(() => this.isStorageReady = true);
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
        let damage_description = departureChecklist['damages_description']; 
        let comments = departureChecklist['comments'];
        this.checklistObj['damages_description'] = departureChecklist['damages_description'] != 'Please describe any damages here....' ? damage_description : '';
        this.checklistObj['delivery_during_clean'] = departureChecklist['delivery_during_clean'];
        this.checklistObj['number_of_beds_made'] = departureChecklist['number_of_beds_made'];
        this.checklistObj['comments'] = departureChecklist['comments'] != 'Leave any comments here......' ? comments : '';
        this.checklistObj['stage'] = '5';
        if (this.isStorageReady) {
            this.storage.set('checklist-'+this.checklistObj['id'],  JSON.stringify(this.checklistObj)).then(res => console.log(res));
            this.checklist.putChecklist('Cleaning', this.checklistObj['id'], this.checklistObj)
                        .subscribe(res => {
                            this.navCtrl.popTo(CleaningOverviewPage);
                        });
        }
    }
}