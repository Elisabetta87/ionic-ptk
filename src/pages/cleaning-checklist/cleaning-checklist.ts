import { Component } from '@angular/core';
import { SecureStorage } from 'ionic-native/dist/es5/index';
import {NavController, NavParams} from 'ionic-angular/index';


@Component({
  selector: 'cleaning-checklist',
  templateUrl: 'cleaning-checklist.html',
  providers: [SecureStorage]
})
export class CleaningChecklistPage {

  private id: string;

  constructor (
    public      navCtrl: NavController,
    private     storage: SecureStorage,
    private   navParams: NavParams
  ) {
    this.id = navParams.get('id');
  }

}

