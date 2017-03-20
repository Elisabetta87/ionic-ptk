import { Observable } from 'rxjs/Rx';
import { StorageST } from './../../services/StorageST';
import { MenuService } from './../../services/menu';
import { JobsListPage } from './../../pages/jobs-list/jobs-list';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, LoadingController, Platform, AlertController } from 'ionic-angular/index';
import {Diagnostic} from 'ionic-native';
import {HomePage} from "../../pages/home/home";
import {HomePageGuest} from "../../pages/home-guest/home-guest";
import {LogInService} from "../../services/log-in-service";
import {GeolocationService} from "../../services/geolocation-service";
import {UserIdService} from "../../services/user-id-service";
import {GetJobsService} from "../../services/get-jobs";


@Component({
  selector: 'log-in-form',
  templateUrl: 'log-in-form.html'
})

export class LogInForm implements OnInit {

  public logInForm: FormGroup;
  private btnClicked: string;
  private isStorageReady: boolean;
  private lat: number;
  private lng: number; 
  private message: string;
  private platformReady: boolean;

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private fb: FormBuilder,
    private logInService: LogInService,
    private userIdService: UserIdService,
    private geolocation: GeolocationService,
    private getJobsService: GetJobsService,
    private menuService: MenuService,
    private loadingCtrl: LoadingController,
    private platform: Platform
  ) {
    let loading = this.loadingCtrl.create({
        content: 'Please wait...'
        });
    loading.present();
    this.platform.ready().then(() => {
      console.log('core = ' + this.platform.is('core'), 'mobileweb = ' + this.platform.is('mobileweb'), 'android = ' + this.platform.is('android'), 'mobile = ' + this.platform.is('mobile'));
      console.log('cordova = ' + this.platform.is('cordova'));
      // if( !(this.platform.is('core') || this.platform.is('mobileweb')) ) {
      //   Diagnostic.isLocationEnabled().then(isAvailable => {
      //     console.log('Is available? ' + isAvailable);
      //     if(isAvailable){
      //       this.storage.create('ptkStorage').then(() => this.isStorageReady = true); 
      //       this.geolocation.getGeoPosition().then((resp) => {
      //         this.lat = resp.coords.latitude;
      //         this.lng = resp.coords.longitude;
      //         loading.dismiss();
      //       });
      //     } else {
      //       let alert = this.alertCtrl.create({
      //       title: 'Location',
      //       subTitle: 'Please Enable GPS',
      //       buttons: [{
      //         text: 'Dismiss',
      //         handler: data => {
      //           //this.platform.exitApp();
      //           Diagnostic.switchToLocationSettings();
      //         }
      //       }]
      //     });
      //     alert.present();
      //     loading.dismiss();
      //     }
      //   },
      //   error => {
      //     console.log(error);
      //     let alert = this.alertCtrl.create({
      //     title: 'Location',
      //     subTitle: 'Please Enable GPS',
      //     buttons: [{
      //       text: 'Dismiss',
      //       handler: data => {
      //         this.platform.exitApp();
      //       }
      //     }]
      //     });
      //     alert.present();
      //     loading.dismiss();
      //   })
      // } else {
        this.geolocation.getGeoPosition().then((resp) => {
          this.lat = resp.coords.latitude;
          this.lng = resp.coords.longitude;
          loading.dismiss();
        })      
   });
 }




  ngOnInit(){
    this.logInForm = this.fb.group({
      username: ['Elisa', Validators.required],
      password: ['GreenTurtle2017', Validators.required]
    });
  }

  logId() {
    this.btnClicked = 'logId';
  }

  logAsGuest() {
    this.btnClicked = 'logAsGuest';
  }


  onSubmit() {
    if (this.btnClicked == 'logId') {
      let body = JSON.stringify(this.logInForm.value);
      let username = this.logInForm.value.username;
      this.logInService.getUserToken(this.logInForm.value)
         .subscribe(resp => {
            let token = resp.token;
            StorageST.set('authToken', token)
                     .subscribe(() => {
                        this.userIdService.getUserId({username: username})
                            .subscribe(resp => {
                                let user_id = resp.results[0].id;
                                StorageST.set('user_id', user_id.toString()).subscribe();
                                this.menuService.displayMenu();
                                this.navCtrl.push(JobsListPage, {id: user_id});
                            })
                     })
         },
         //error => console.log('Unable to log in with provided credentials.')
         );                                                                
    };
    if (this.btnClicked == 'logAsGuest') {
      this.menuService.hideMenu();
      let today = new Date();
      let location = this.lat + ',' + this.lng;
      let params = {
        location: location,
        datetime: today.toISOString()
      };
      this.logInService.getGuestJobMatch(params).subscribe(
        resp => {
        if(resp.results.length == 0) {
          console.log('Sorry No job found!')
          this.message = 'Sorry No Job Found!';
        } else {
          console.log(resp.results);
          let job = resp.results[0];
          this.navCtrl.push(HomePageGuest, {job: job});
        }
      },
      error => console.log('no job found!')
      );
    }
  };

}

