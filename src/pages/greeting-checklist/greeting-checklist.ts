import { ChecklistService } from './../../services/checklist';
import { NavController, NavParams } from 'ionic-angular/index';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SecureStorage } from 'ionic-native/dist/es5/index';
import { Component, OnInit } from '@angular/core';





@Component({
  selector: 'greeting-checklist',
  templateUrl: 'greeting-checklist.html',
  providers: [SecureStorage]
})

export class GreetingChecklistPage implements OnInit {

    private isStorageReady:boolean;
    private greetingForm: FormGroup;
    private checklistObj: Object = {};

    constructor(
        private storage: SecureStorage,
        private fb: FormBuilder,
        private navController: NavController,
        private navParams: NavParams,
        private checklistService: ChecklistService
    ){
        this.storage = new SecureStorage();
        this.storage.create('ptkStorage').then(res => this.isStorageReady);
        this.checklistObj = this.navParams.get('checklistObj');
    }


    ngOnInit() {
        this.greetingForm = this.fb.group({
            comments: [this.checklistObj['comments'] ? this.checklistObj['comments'] : '', [Validators.required]]
        }); 
    }


    onSubmit() {
        // let arrivalChecklist = this.greetingForm.value;
        // this.checklistObj['stage'] = '3';
        // this.checklistObj['job'] = this.jobId;
        // this.checklistObj['id'] = this.id;
        // let stringifyForm = JSON.stringify(this.checklistObj);
        // let checklist = 'checklist-'+this.id;
        // if (this.isStorageReady) {
        // this.storage.set(checklist, stringifyForm).then(res => console.log(res));
        // this.checklist.putChecklist(Object.keys(this.checklistObj)[0], this.id, this.checklistObj)
        //               .subscribe(res => {
        //                 console.log(res);
        //                 //this.navCtrl.popTo(CleaningOverviewPage);
        //             });
        //     }
    }
}
