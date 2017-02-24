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
    public      navCtrl: NavController,
    private     storage: SecureStorage,
    private   navParams: NavParams
  ) {
    this.id = navParams.get('id');
    let checklist = 'checklist-'+this.id;
    //console.log(checklist);
  }

}

