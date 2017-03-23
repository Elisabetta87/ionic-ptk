import { Camera } from 'ionic-native';
import { StorageST } from './../../services/StorageST';
import { ChecklistOverviewPage } from './../checklist-overview/checklist-overview';
import { NavController, NavParams, Slides } from 'ionic-angular/index';
import { Component, ViewChild } from '@angular/core';


@Component({
  selector: 'property-info-page',
  templateUrl: 'property-info.html'
})


export class PropertyInfoPage {
  @ViewChild(Slides) slides: Slides;

  private checklistObj: {};
  private propertyInfo: {};
  private page: {};
  private slide: {};
  private section_name: string;
  private currSlideIndex:number = 0;
  //
  private currentIndex:number;
  //
  public base64Image: Array<string>;
  private allPicTaken: boolean;
  //private picturesTaken: {};

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams
  ){
    this.checklistObj = this.navParams.get('checklistObj');
    this.propertyInfo = this.navParams.get('propertyInfo');
    this.section_name = this.navParams.get('section_name');
    this.page = this.navParams.get('page');
    this.slide = this.page['slides'][this.currSlideIndex];
    this.base64Image = [];
    // if (this.picturesTaken == undefined) {
    //   this.picturesTaken = {};
    // } 
  }

  ionViewWillEnter() {
    //console.log(this.picturesTaken);
    console.log(this.page);
    for(let index of this.base64Image) {
      if(index == undefined) {
        return this.allPicTaken = false;
      } else {
        this.allPicTaken = true;
      }
    }
  }

  slideChanged() {
    this.currentIndex = this.slides.getActiveIndex();
    console.log("Current index is", this.currentIndex);
  }
  prev() {
    this.slides.slidePrev();
  }
  next() {
    this.slides.slideNext();
  }

  public takePicture(slideIndex, deleteVal?:boolean) {
        Camera.getPicture({
            quality : 50,//is the default quality
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : false,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            saveToPhotoAlbum: false
        }).then(imageData => {
            if(deleteVal) {
              delete this.base64Image[slideIndex] 
            }
            this.base64Image[slideIndex] = "data:image/jpeg;base64," + imageData;
            for(let index of this.base64Image) {
              if(index == undefined) {
                return this.allPicTaken = false;
              } else {
                this.allPicTaken = true;
              }
            }
            //this.picturesTaken['slideIndex'] = this.base64Image;
            // this.page['pic'] = this.base64Image;
            // console.log(this.picturesTaken);
            // this.currentIndex = slideIndex;
        }, error => {
            console.log("ERROR -> " + JSON.stringify(error));
        });
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