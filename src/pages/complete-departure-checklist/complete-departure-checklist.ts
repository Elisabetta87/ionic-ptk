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

    constructor(
        private fb: FormBuilder,
        private navCtrl: NavController,
        private storage: SecureStorage,
        private navParams: NavParams,
        private platform: Platform
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
              damages_description: ['Please describe any damages here....', [Validators.required]],
            delivery_during_clean: [false, [Validators.required]],
              number_of_beds_made: ['', Validators.required],
                         comments: ['Leave any comments here......']
        })
    }

    delivery() {
        console.log('delivery: '+this.delivery_during_clean);
        //     this.c
        // }
    }

    damages() {
        console.log('damages: '+ this.damages_reported);
    //     if (this.checked == false) {
    //   this.checked =  true;
    // } else {
    // this.checked =  false;
    // }
    // return this.checked;
    }



    onSubmit() {
        let departureChecklist = this.departureChecklistForm.value;
        console.log(departureChecklist);
    }
    //   this.storage = new SecureStorage();
    //   this.storage.create('ptkStorage').then(
    //       ready => {
    //           this.isStorageReady = true;
    //           if(this.isStorageReady) {
    //           this.storage.get('checklistStage-job-'+this.jobId).then(
    //             data => {
    //                 let obj = JSON.parse(data);
    //                 obj.status = 5;
    //                 data = JSON.stringify(obj);
    //                 this.storage.set('checklistStage-job-'+this.jobId, data);
    //                 this.navCtrl.popTo(ChecklistStatusPage);
    //             },
    //             error => console.log(error)
    //             )
    //         }
    //       }
    //   );
    // }
}