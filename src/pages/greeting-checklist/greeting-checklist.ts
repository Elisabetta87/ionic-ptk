import { StorageST } from './../../services/StorageST';
import { GreetingOverviewPage } from './../greeting-overview/greeting-overview';
import { ChecklistService } from './../../services/checklist';
import { NavController, NavParams } from 'ionic-angular/index';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'greeting-checklist',
  templateUrl: 'greeting-checklist.html'
})

export class GreetingChecklistPage implements OnInit {

    private isStorageReady:boolean;
    private greetingForm: FormGroup;
    private checklistObj: Object = {};
    private job: Object;

    constructor(
        private fb: FormBuilder,
        private navCtrl: NavController,
        private navParams: NavParams,
        private checklistService: ChecklistService
    ){
        this.checklistObj = this.navParams.get('checklistObj');
        this.job = this.navParams.get('job');
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
        StorageST.set('checklist-'+this.job['checklists']['Greeting'], this.checklistObj).subscribe();
        this.checklistService.putChecklist('Greeting', this.job['checklists']['Greeting'], this.checklistObj).subscribe(() => this.navCtrl.popTo(GreetingOverviewPage));
    }
}
