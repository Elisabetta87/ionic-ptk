import { CleaningOverviewPage } from './../cleaning-overview/cleaning-overview';
import { SecureStorage } from 'ionic-native';
import { NavController, NavParams } from 'ionic-angular/index';
import { Component } from '@angular/core';


@Component({
    selector: 'rubbish-page',
    templateUrl: 'rubbish-info.html'
})

export class RubbishInfoPage {

    private checklistObj: Object;
    private isStorageReady: boolean;

    constructor(
        private navCtrl: NavController,
        private storage: SecureStorage,
        private navParams: NavParams
    ){
        this.checklistObj = this.navParams.get('checklistObj');
        this.storage = new SecureStorage();
        this.storage.create('ptkStorage').then(()=> this.isStorageReady = true);
    }



    send() {
        if(this.isStorageReady) {
            this.checklistObj['stage'] = '3.3';
            this.storage.set('checklist-'+this.checklistObj['id'], JSON.stringify(this.checklistObj));
            this.navCtrl.popTo(CleaningOverviewPage);
        }
    }
}