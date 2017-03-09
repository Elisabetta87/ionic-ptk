import { StorageST } from './../../services/StorageST';
import { CleaningOverviewPage } from './../cleaning-overview/cleaning-overview';
import { NavController, NavParams } from 'ionic-angular/index';
import { Component } from '@angular/core';




@Component({
    selector: 'linen-page',
    templateUrl: 'linen-info.html'
})

export class LinenInfoPage {

    private checklistObj: Object;

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams
    ){
        this.checklistObj = this.navParams.get('checklistObj');
    }

    send() {
        this.checklistObj['stage'] = '3.2';
        StorageST.set('checklist-'+this.checklistObj['id'], this.checklistObj)
                 .subscribe(() => this.navCtrl.popTo(CleaningOverviewPage));
    }
}