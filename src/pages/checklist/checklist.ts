import { Component } from '@angular/core';
import { SecureStorage } from 'ionic-native/dist/es5/index';
import {NavController, LoadingController, NavParams} from 'ionic-angular/index';
import { ChecklistSecondPage } from '../checklist-second/checklist-second';
import { ThankYouPage } from '../thank-you/thank-you';


@Component({
  selector: 'page-checklist',
  templateUrl: 'checklist.html',
  providers: [SecureStorage]
})
export class ChecklistPage {

  private id: string;

  constructor (
    //public  loadingCtrl: LoadingController,
    public      navCtrl: NavController,
    private     storage: SecureStorage,
    private   navParams: NavParams
  ) {
/* loading test */
    /*let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 3000);*/



    this.id = navParams.get('id');
    let checklist = 'checklist'+this.id;
    console.log(checklist);
    // this.storage = new SecureStorage();
    // this.storage.create('form');
    // this.storage.get(checklist)
    //     .then(
    //       data => {
    //         let formStorage = JSON.parse(data);
    //         if (formStorage['stage'] == 2) {
    //           this.navCtrl.setRoot(ChecklistSecondPage);
    //         } else if (formStorage['stage'] == 3) {
    //           this.navCtrl.setRoot(ThankYouPage);
    //         } else if (formStorage == null ) {
    //           console.log('stage 1');
    //         }
    //       },
    //       error => {
    //         console.log(error);
    //       }
    //     )
  }

}

