import { GetChecklistId } from './../../services/get-checklist-id';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular/index';
import { ChecklistStatusPage } from '../checklist-status/checklist-status';

@Component({
  selector: 'page-job-details',
  templateUrl: 'job-details.html'
})
export class JobDetailsPage {
  /*set lat and lng for google map */
  property_latitude: number;
  property_longitude: number;

  private id: number;
  private address: string;
  private services: string;
  private checklistBody: Object;
  private current_date: Date = new Date();

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private getChecklistId: GetChecklistId
  ) {

    this.address = navParams.get('address');
    this.services = navParams.get('services');
    this.id = navParams.get('id');
    this.property_latitude = navParams.get('property_latitude');
    this.property_longitude = navParams.get('property_longitude');
  }

  completeChecklist() {
    /*this.navCtrl.push(ChecklistPage, {
      id: this.id
    });*/
    this.checklistBody = {
                 job: this.id,
      check_in_stamp: this.current_date.toISOString().slice(0,10) + ' ' + this.current_date.toISOString().slice(11, 16),
    }
    this.getChecklistId.checklistId(this.checklistBody, {withCredentials: ''}).subscribe(
      checklist => {
        console.log(checklist, checklist.id);
         this.navCtrl.push(ChecklistStatusPage, {
            id: checklist.id,
            services: this.services
          });
      })
  }

}

