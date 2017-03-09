import { StorageST } from './../../services/StorageST';
import { CleaningOverviewPage } from './../cleaning-overview/cleaning-overview';
import { SecureStorage } from 'ionic-native/dist/es5/index';
import { NavController, NavParams } from 'ionic-angular/index';
import { Component } from '@angular/core';



@Component({
    selector: 'photos-page',
    templateUrl: 'photos.html'
})
export class PhotosPage {

    private checklistObj: Object;

    constructor(
        private navCtrl: NavController,
        private storage: SecureStorage,
        private navParams: NavParams
    ) {
      this.checklistObj = this.navParams.get('checklistObj');
    }

    send() {
      this.checklistObj['stage'] = '3.1';
      StorageST.set('checklist-'+this.checklistObj['id'], this.checklistObj)
               .subscribe(() => this.navCtrl.popTo(CleaningOverviewPage));   
    }

}



