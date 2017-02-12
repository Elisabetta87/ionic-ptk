import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular/index';
import {ChecklistPage} from "../checklist/checklist";



@Component({
  selector: 'page-checklist-status',
  templateUrl: 'checklist-status.html'
})
export class ChecklistStatusPage {

  private id: number;
  private service: string;
  private greenBar: string;

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams
  ) {

    this.id = navParams.get('id');
    this.service = navParams.get('service');
    this.greenBar = this.id ? 'greenBar' : '';
  }

  checklist() {
    this.navCtrl.setRoot(ChecklistPage);
  }

  completeChecklist() {
    /*this.navCtrl.push(ChecklistPage, {
     id: this.id
     });*/

  }


}
