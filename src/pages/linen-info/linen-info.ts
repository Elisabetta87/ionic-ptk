import { StorageST } from './../../services/StorageST';
import { CleaningOverviewPage } from './../cleaning-overview/cleaning-overview';
import { SecureStorage } from 'ionic-native/dist/es5/index';
import { NavController, NavParams } from 'ionic-angular/index';
import { Component } from '@angular/core';




@Component({
    selector: 'linen-page',
    templateUrl: 'linen-info.html'
})

export class LinenInfoPage {

    private checklistObj: Object;
    private isStorageReady:boolean;

    constructor(
        private navCtrl: NavController,
        //private storageService: StorageST,
        private storage: SecureStorage,
        private navParams: NavParams
    ){
        this.checklistObj = this.navParams.get('checklistObj');
        this.storage = new SecureStorage();
        this.storage.create('ptkStorage').then(()=> this.isStorageReady = true);
    }

    send() {
      if(this.isStorageReady){    
        this.checklistObj['stage'] = '3.2';
        this.storage.set('checklist-'+this.checklistObj['id'], JSON.stringify(this.checklistObj));
        this.navCtrl.popTo(CleaningOverviewPage);
      }



    //   this.storageService.getStorage(this.storage)
    //       .subscribe(() => {
    //         this.checklistObj['stage'] = '3.2';
    //         this.storage.set('checklist-'+this.checklistObj['id'], JSON.stringify(this.checklistObj));
    //         this.navCtrl.popTo(CleaningOverviewPage);
    //       })
    }
}