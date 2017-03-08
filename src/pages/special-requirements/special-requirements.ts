import { CleaningOverviewPage } from './../cleaning-overview/cleaning-overview';
import { SecureStorage } from 'ionic-native/dist/es5/index';
import { NavController, NavParams } from 'ionic-angular/index';
import { Component } from '@angular/core';


@Component({
    selector: 'requirements-page',
    templateUrl: 'special-requirements.html'
})


export class SpecialRequirementsPage {

    private isStorageReady: boolean;
    private checklistObj: Object;

    constructor(
        private navCtrl: NavController,
        private storage: SecureStorage,
        private navParams: NavParams
    ) {
        this.checklistObj = this.navParams.get('checklistObj');
        this.checklistObj = this.navParams.get('checklistObj');
        this.storage = new SecureStorage();
        this.storage.create('ptkStorage').then(()=> this.isStorageReady = true);
    }

    send() {
        if(this.isStorageReady) {
            this.checklistObj['stage'] = '3.4';
            this.storage.set('checklist-'+this.checklistObj['id'], JSON.stringify(this.checklistObj));
            this.navCtrl.popTo(CleaningOverviewPage);
        
        }
    }
}