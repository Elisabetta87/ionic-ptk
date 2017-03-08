import { GreetingOverviewPage } from './../greeting-overview/greeting-overview';
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
    private job: Object;

    constructor(
        private storage: SecureStorage,
        private fb: FormBuilder,
        private navCtrl: NavController,
        private navParams: NavParams,
        private checklistService: ChecklistService
    ){
        this.storage = new SecureStorage();
        this.storage.create('ptkStorage').then(res => this.isStorageReady = true);
        this.checklistObj = this.navParams.get('checklistObj');
        this.job = this.navParams.get('job');
        console.log(this.job);
    }


    ngOnInit() {
        this.greetingForm = this.fb.group({
            comments: [this.checklistObj['comments'] ? this.checklistObj['comments'] : '', [Validators.required]]
        }); 
    }


    onSubmit() {
        let greetingChecklist = this.greetingForm.value;
        this.checklistObj['comments'] = greetingChecklist.comments;
        this.checklistObj['stage'] = '3';
        this.checklistObj['job'] = this.job['id'];
        this.checklistObj['id'] = this.job['checklists']['Greeting'];
        if (this.isStorageReady) {
            console.log('checklist-'+this.job['checklists']['Greeting']);
            console.log(JSON.stringify(this.checklistObj));
            this.storage.set('checklist-'+this.job['checklists']['Greeting'], JSON.stringify(this.checklistObj)).then(res => console.log(res));
            this.checklistService.putChecklist('Greeting', this.job['checklists']['Greeting'], this.checklistObj)
                        .subscribe(res => {
                            console.log(res);
                            this.navCtrl.popTo(GreetingOverviewPage);
                        });
        }
    }
}
