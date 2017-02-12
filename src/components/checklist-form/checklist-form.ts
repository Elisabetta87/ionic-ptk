import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeolocationService } from '../../services/geolocation-service';
import { NavController, NavParams } from 'ionic-angular/index';
import { ChecklistSecondPage } from '../../pages/checklist-second/checklist-second';
import { SecureStorage } from 'ionic-native';




@Component({
  selector: 'checklist-form',
  templateUrl: 'checklist-form.html'
})

export class PropertyForm implements OnInit {

  private id: string;
  public propertyForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    private fb: FormBuilder,
    private geoService: GeolocationService,
    private storage: SecureStorage,
    private navParams: NavParams
  ) {
    this.id = navParams.get('id');
    this.storage = new SecureStorage();
    this.storage.create('form');
  }

  ngOnInit(){
// setting validators for propertyForm
    this.propertyForm = this.fb.group({
      address: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      city: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      postcode: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]{1,2}(\\d[a-zA-Z]|[\\d]{2})\\s*\\d[a-zA-Z]{2}$')])],
      dirtyLinen: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
      cleanLinen: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]
    });

// get address info from google api and setValue into the input form fields
    this.geoService.getGeoPosition().then(resp => {
      this.geoService.getAddress(resp.coords)
          .subscribe(address => {
            this.propertyForm.controls['address'].setValue(address['street_number'] + ',  ' + address['route']);
            this.propertyForm.controls['city'].setValue(address['locality']);
            this.propertyForm.controls['postcode'].setValue(address['postal_code']);

          });

      // let watch = Geolocation.watchPosition();
      // watch.subscribe((data) => {
      //   // data can be a set of coordinates, or an error (if an error occurred).
      //   // data.coords.latitude
      //   // data.coords.longitude
      //   //console.log(data);
      // });

    })
    .catch((error) => {
      console.log('Error getting location', error);

    });


  }


// when submit the form user goes to a  new page propertyDetailsPage
  onSubmit() {
    this.propertyForm.value['stage'] = '2';
    let stringifyForm = JSON.stringify(this.propertyForm.value);
    let checklist = 'checklist-'+this.id;
    console.log(checklist);
    this.storage.set(checklist, stringifyForm);
    /*this.navCtrl.setRoot(ChecklistSecondPage, {
      id: this.id
    })*/;
  };


}
