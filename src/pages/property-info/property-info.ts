import { StorageST } from './../../services/StorageST';
import { ChecklistOverviewPage } from './../checklist-overview/checklist-overview';
import { NavController, NavParams } from 'ionic-angular/index';
import { Component } from '@angular/core';



@Component({
  selector: 'property-info-page',
  templateUrl: 'property-info.html'
})


export class PropertyInfoPage {

  private checklistObj: {};
  private propertyInfo: {};
  private page: {};
  private slide: {};
  private currSlideIndex:number = 0;

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams
  ){
    this.checklistObj = this.navParams.get('checklistObj');
    this.propertyInfo = this.navParams.get('propertyInfo');
    this.page = this.navParams.get('page');
    this.slide = this.page['slides'][this.currSlideIndex];
    console.log(this.checklistObj);
  }

  nextSlide() {
    if(this.currSlideIndex+1<this.page['slides'].length) {
      this.slide = this.page['slides'][this.currSlideIndex+1];
      this.currSlideIndex = this.currSlideIndex+1;
    }
  }

  previousSlide() {
    if(this.currSlideIndex-1>=0) {
      this.slide = this.page['slides'][this.currSlideIndex-1];
      this.currSlideIndex = this.currSlideIndex-1;
    }
  }

  submitAllSlidesViewed() {
    if (+this.checklistObj['stage'] <= +this.page['page_stage']) {
      this.checklistObj['stage'] = (+this.page['page_stage']+0.1).toFixed(1).toString();
    }
    this.checkIfFinalPropertyInfoPage();
    StorageST.set('checklist-'+this.checklistObj['id'], this.checklistObj).subscribe(() => {this.navCtrl.popTo(ChecklistOverviewPage)});
  }

  checkIfFinalPropertyInfoPage() {
    let baseStage = Math.floor(+this.checklistObj['stage']);
    let pageStage = parseFloat((+this.checklistObj['stage'] % 1).toFixed(1));
    let x = pageStage * 10;
    if ( x == this.propertyInfo['info'].length ) {
      this.checklistObj['stage'] = (baseStage+1).toString();
    }
  }

}