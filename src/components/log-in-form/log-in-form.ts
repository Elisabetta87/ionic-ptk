import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {NavController} from 'ionic-angular/index';
import {SecureStorage} from 'ionic-native';
import {HomePage} from "../../pages/home/home";
import {HomePageGuest} from "../../pages/home-guest/home-guest";
import {LogInService} from "../../services/log-in-service";
import {GeolocationService} from "../../services/geolocation-service";
import {UserIdService} from "../../services/user-id-service";
import {GetJobsService} from "../../services/get-jobs";
import {JobsListPage} from "../../pages/jobs-list/jobs-list";
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/fromPromise';



@Component({
  selector: 'log-in-form',
  templateUrl: 'log-in-form.html',
  providers: [SecureStorage]
})

export class LogInForm implements OnInit {

  public logInForm: FormGroup;
  private btnClicked: string;
  private isStorageReady: boolean;
  private lat: number;
  private lng: number; 

  constructor(
    public navCtrl: NavController,
    private fb: FormBuilder,
    private storage: SecureStorage,
    private logInService: LogInService,
    private userIdService: UserIdService,
    private geolocation: GeolocationService,
    private getJobsService: GetJobsService
  ) {
    this.storage = new SecureStorage();
    this.storage.create('ptkStorage').then(
      () => { console.log('storage is ready'); this.isStorageReady = true; });
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





//   getParams(obj) {

//     for(let index in obj) {
//       console.log(obj[index]);
      
//     }
//     console.log(Object.keys(obj).length);
      
//  }

// when submit the form user goes to a  new page propertyDetailsPage
  onSubmit() {
    //if clicked on the 'continue as guest' button store checklist guestId else logId
    //this.logInfoStorage = {'authToken': 'logInfo'};
    if (this.btnClicked == 'logId') {
      let body = JSON.stringify(this.logInForm.value);

      //this.getParams({one: 'ciao', two: 'hello', three: 'hola'});


      //console.log(body);
      let username = this.logInForm.value.username;
      this.logInService.getUserToken(this.logInForm.value)
         .subscribe(resp => {
           console.log(resp);
            let token = resp.token;
            if(this.isStorageReady){
              Observable.fromPromise(this.storage.set('authToken', token))
                  .subscribe( token => {
                                this.userIdService.getUserId({username: username}, {withCredentials: ''})
                                    .subscribe(resp => {
                                        console.log(resp);
                                        console.log(resp.results[0].id);
                                        let user_id = resp.results[0].id;
                                        this.navCtrl.push(JobsListPage, {id: user_id});
                                    })
                            });
            }
         },
         //error => console.log('Unable to log in with provided credentials.')
         );                                                                
        //
        //         //&status=accepted,completed&start_date=2017-2-13&end_date=2017-2-27
        //         /*this.getJobsService.getJobs('http://ptkconnect.co.uk/api/v2/jobs/', {token: data})
        //           .subscribe(resp => console.log(resp))*/
        //       });
        //   });
        //   this.navCtrl.setRoot(JobsListPage);
        // });
    };
    if (this.btnClicked == 'logAsGuest') {
      let today = new Date();
      let location = this.lat + ', ' + this.lng;
      let body = {
        datetime: today,
        location: location
      };
      //console.log(body);
      //this.logInService.getGuestJobMatch(this.urlGuest, body).subscribe(resp => {
        //console.log(resp);
      //});
      this.navCtrl.setRoot(HomePageGuest);
    }
  };

}

