import { StorageST } from './../../services/StorageST';
import { CleaningOverviewPage } from './../cleaning-overview/cleaning-overview';
import { NavController, NavParams } from 'ionic-angular/index';
import { Component } from '@angular/core';


@Component({
    selector: 'rubbish-page',
    templateUrl: 'rubbish-info.html'
})

export class RubbishInfoPage {

    private checklistObj: Object;

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams
    ){
        this.checklistObj = this.navParams.get('checklistObj');
    }

    send() {
        this.checklistObj['stage'] = '3.3';
        StorageST.set('checklist-'+this.checklistObj['id'], this.checklistObj)
                 .subscribe(() => this.navCtrl.popTo(CleaningOverviewPage));
    }
}