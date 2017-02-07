import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {GeolocationService} from '../../services/geolocation-service';
import {NavController} from 'ionic-angular/index';
import {PropertyDetailsPage} from '../../pages/property-details/property-details';
import {StorageService} from "../../services/storage-service";




@Component({
  selector: 'property-form',
  templateUrl: 'property-form.html'
})

export class PropertyForm implements OnInit {

  public propertyForm: FormGroup;

  constructor(
    private geoService: GeolocationService,
    public navCtrl: NavController,
    private secStorage: StorageService
  ) {}

  ngOnInit(){
// setting validators for propertyForm
    this.propertyForm = new FormGroup({
      address: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      city: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      postcode: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]{1,2}(\\d[a-zA-Z]|[\\d]{2})\\s*\\d[a-zA-Z]{2}$')])),
      dirtyLinen: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])),
      cleanLinen: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')]))
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
    console.log(stringifyForm);
    this.secStorage.setStorageItem('firstForm', stringifyForm);
    this.navCtrl.setRoot(PropertyDetailsPage);
  };


}
