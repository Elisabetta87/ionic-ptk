import { UpdateChecklist } from './../../services/update-checklist';
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
        private updateChecklist: UpdateChecklist
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
            clean_linen_count_end: ['', Validators.required],
            dirty_linen_count_end: ['', [Validators.required]],
                 damages_reported: [false, [Validators.required]],
              damages_description: ['Please describe any damages here....'],
            delivery_during_clean: [false, [Validators.required]],
              number_of_beds_made: ['', Validators.required],
                         comments: ['Leave any comments here......']
        })
    }

    delivery() {
        console.log('delivery: '+this.delivery_during_clean);
        return this.delivery_during_clean
    }

    damages() {
        console.log('damages: '+ this.damages_reported);
        return this.damages_reported
    }



    onSubmit() {
        let departureChecklist = this.departureChecklistForm.value;
        this.checklistObj['clean_linen_count_end'] = departureChecklist['clean_linen_count_end'];
        this.checklistObj['dirty_linen_count_end'] = departureChecklist['dirty_linen_count_end'];
        this.checklistObj['damages_reported'] = departureChecklist['damages_reported'];
        this.checklistObj['damages_description'] = departureChecklist['damages_description'];
        this.checklistObj['delivery_during_clean'] = departureChecklist['delivery_during_clean'];
        this.checklistObj['number_of_beds_made'] = departureChecklist['number_of_beds_made'];
        this.checklistObj['comments'] = departureChecklist['comments'];
        this.checklistTracker['job'] = this.checklistObj['job'];
        this.checklistTracker['status'] = 5;
        this.checklistTracker['id'] = this.id;
        let stringifyTracker = JSON.stringify(this.checklistTracker);
        let stringifyForm = JSON.stringify(this.checklistObj);
        let checklist = 'checklist-'+this.id;
        if (this.isStorageReady) {
        this.storage.set(checklist, stringifyForm);//.then(res => console.log(res));
        this.storage.set('checklistStage-job-'+this.jobId, stringifyTracker).then(res => console.log(res));
        console.log(this.id);
        this.updateChecklist.putChecklist(this.id, this.checklistObj)
                            .subscribe(res => {
                                this.navCtrl.popTo(ChecklistStatusPage);
                            });
        }
    }
}