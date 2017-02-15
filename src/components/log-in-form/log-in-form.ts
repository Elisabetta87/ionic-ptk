import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {NavController} from 'ionic-angular/index';
import {SecureStorage} from 'ionic-native';
import {HomePage} from "../../pages/home/home";
import {HomePageGuest} from "../../pages/home-guest/home-guest";
import {LogInService} from "../../services/log-in-service";
import {GeolocationService} from "../../services/geolocation-service";


@Component({
  selector: 'log-in-form',
  templateUrl: 'log-in-form.html'
})

export class LogInForm implements OnInit {

  public logInForm: FormGroup;
  private btnClicked: string;
  private logInfoStorage: any;
  private lat: number;
  private lng: number;
  private urlUser: string = 'http://ptkconnect.co.uk/api/token-auth/';
  //private urlGuest: string = 'http://ptkconnect.co.uk/api/v2/guest/match';

  constructor(
    public navCtrl: NavController,
    private fb: FormBuilder,
    private storage: SecureStorage,
    private logInService: LogInService,
    private geolocation: GeolocationService
  ) {
    this.storage = new SecureStorage();
    this.storage.create('authToken');
    this.geolocation.getGeoPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
    });
  }


  ngOnInit(){
    this.logInForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  logId() {
    this.btnClicked = 'logId';
  }

  logAsGuest() {
    this.btnClicked = 'logAsGuest';
  }

// when submit the form user goes to a  new page propertyDetailsPage
  onSubmit() {
    //if clicked on the 'continue as guest' button store checklist guestId else logId
    //this.logInfoStorage = {'authToken': 'logInfo'};
    if (this.btnClicked == 'logId') {
      let body = JSON.stringify(this.logInForm.value);
      this.logInService.getUserToken(this.urlUser, body, false).subscribe(resp =>  {
          console.log(resp.token);
          this.storage.set('authToken', JSON.stringify(resp.token));
          this.navCtrl.setRoot(HomePage);
          }
          //error => console.log(error)
      );
    }
    if (this.btnClicked == 'logAsGuest') {
      let today = new Date();
      let location = this.lat + ', ' + this.lng;
      let body = {
        datetime: today,
        location: location
      }
      console.log(body);
      /*this.logInService.getGuestJobMatch(this.urlGuest, body).subscribe(resp => {
        console.log(resp);
      });*/
      //this.navCtrl.setRoot(HomePageGuest);
    }
  };

}

