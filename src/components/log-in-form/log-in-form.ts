import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {NavController} from 'ionic-angular/index';
import {SecureStorage} from 'ionic-native';
import {HomePage} from "../../pages/home/home";
import {HomePageGuest} from "../../pages/home-guest/home-guest";




@Component({
  selector: 'log-in-form',
  templateUrl: 'log-in-form.html'
})

export class LogInForm implements OnInit {

  public logInForm: FormGroup;
  private btnClicked: string;
  private logInfoStorage: any;

  constructor(
    public navCtrl: NavController,
    private fb: FormBuilder,
    private storage: SecureStorage
  ) {
    this.storage = new SecureStorage();
    this.storage.create('logIn');
  }


  ngOnInit(){
    this.logInForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
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
    this.logInfoStorage = {'logInfo': 'logInfo'};
    if (this.btnClicked == 'logId') {
      this.logInfoStorage['logId'] = '1';
      this.storage.set('logInfo', JSON.stringify(this.logInfoStorage));
      this.navCtrl.setRoot(HomePage);
    } else {
      this.logInfoStorage['guestId'] = 'G1';
      this.storage.set('logInfo', JSON.stringify(this.logInfoStorage));
      this.navCtrl.setRoot(HomePageGuest);
    }
  };

}

