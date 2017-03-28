import { TabsPage } from './../../pages/tabs/tabs';
import { StorageST } from './../../services/StorageST';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, LoadingController, Platform, AlertController } from 'ionic-angular/index';
//import {Diagnostic} from 'ionic-native';
import {HomePageGuest} from "../../pages/home-guest/home-guest";
import {LogInService} from "../../services/log-in-service";
import {GeolocationService} from "../../services/geolocation-service";
import {UserIdService} from "../../services/user-id-service";
import {GetJobsService} from "../../services/get-jobs";

import Hashids from 'hashids';

@Component({
  selector: 'log-in-form',
  templateUrl: 'log-in-form.html'
})

export class LogInForm implements OnInit {

  public logInForm: FormGroup;
  private btnClicked: string;
  private lat: number;
  private lng: number; 
  private message: string;

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private fb: FormBuilder,
    private logInService: LogInService,
    private userIdService: UserIdService,
    private geolocation: GeolocationService,
    private getJobsService: GetJobsService,
    private loadingCtrl: LoadingController,
    private platform: Platform
  ) {
    let loading = this.loadingCtrl.create({
        content: 'Please wait...'
        });
    loading.present();
    this.platform.ready().then(() => {
      // if( !(this.platform.is('core') || this.platform.is('mobileweb')) ) {
      //   Diagnostic.isLocationEnabled().then(isAvailable => {
      //     console.log('Is available? ' + isAvailable);
      //     if(isAvailable){
      //       //this.storage.create('ptkStorage').then(() => this.isStorageReady = true); 
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
      //}
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
      let username = this.logInForm.value.username;
      this.logInService.getUserToken(this.logInForm.value)
         .subscribe(resp => {
            let token = resp.token;
            let objTokenCreated = {
              token: token,
              currentDate: new Date()
            }
            StorageST.set('authToken', objTokenCreated)
                     .subscribe(() => {
                        this.userIdService.getUserId({username: username})
                            .subscribe(resp => {
                                let user_id = resp.results[0].id;
                                StorageST.set('user_id', user_id.toString()).subscribe();
                                //
                                // set root as TabsPage
                                //
                                this.navCtrl.push(TabsPage);
                            })
                     })
         },
         //error => console.log('Unable to log in with provided credentials.')
         );                                                                
    };
    if (this.btnClicked == 'logAsGuest') {
      let hashids = new Hashids("this is my salt", 17, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");
      let id = hashids.encode(30, 322);
      let numbers = hashids.decode(id);
      console.log(id, numbers);

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
          //
           // set root as HomePageGuest
           //
          this.navCtrl.push(HomePageGuest, {job: job});
        }
      },
      error => console.log('no job found!')
      );
    }
  };

}

