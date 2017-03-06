import { NavController, NavParams } from 'ionic-angular/index';
import { Component } from '@angular/core';







@Component({
    selector: 'greeting-overview',
    templateUrl: 'greeting-overview.html'
})

export class GreetingOverview {

    private id: number;
    private jobId: number;
    private checklistObj:Object;
    private services: string;
    private greenBar: string;
    private isToggled: boolean;
    private check_out: boolean;

    constructor(
        private navController: NavController,
        private navParams: NavParams
    ){
        this.id = navParams.get('id');
        this.jobId = navParams.get('jobId');
        this.checklistObj = navParams.get('checklistObj');
        this.services = navParams.get('service');
        this.greenBar = this.id ? 'greenBar' : '';
        this.isToggled = false;
        this.check_out = false;
    }

}