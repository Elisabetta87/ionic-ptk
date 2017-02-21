import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
//import { FormsModule } from '@angular/forms';
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
  are_keys_in_there: boolean = false;

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
    console.log(this.id);
  }

  ngOnInit(){
    //this.are_keys_in_there = true;
// setting validators for propertyForm
    this.propertyForm = this.fb.group({
      keys_in_keysafe: [false, Validators.required],
      dirty_linen_count_start: [0, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
      clean_linen_count_start: [0, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]
    });

// get address info from google api and setValue into the input form fields
    // this.geoService.getGeoPosition().then(resp => {
    //   this.geoService.getAddress(resp.coords)
    //       .subscribe(address => {
    //         this.propertyForm.controls['address'].setValue(address['street_number'] + ',  ' + address['route']);
    //         this.propertyForm.controls['city'].setValue(address['locality']);
    //         this.propertyForm.controls['postcode'].setValue(address['postal_code']);

    //       });

    //   let watch = Geolocation.watchPosition();
    //   watch.subscribe((data) => {
    //     // data can be a set of coordinates, or an error (if an error occurred).
    //     // data.coords.latitude
    //     // data.coords.longitude
    //     //console.log(data);
    //   });

    // })
    // .catch((error) => {
    //   console.log('Error getting location', error);

    // });

  }
  notify() {
    if (this.are_keys_in_there == false) {
      this.are_keys_in_there =  true;
    } else {
      this.are_keys_in_there =  false;
    }
    console.log(this.are_keys_in_there);
    return this.are_keys_in_there;
  }


  getNumber(number:number) {
    console.log(number);
  }

// when submit the form user goes to a  new page propertyDetailsPage
  onSubmit() {
    //let n = this.getNumber;
    //console.log(n);
   // this.propertyForm.value['dirty_linen_count_start']= this.getNumber;
   // this.propertyForm.value['clean_linen_count_start']= this.getNumber;
     console.log(this.propertyForm.value);
    //this.propertyForm.value['stage'] = '2';
    let stringifyForm = JSON.stringify(this.propertyForm.value);
    let checklist = 'checklist-'+this.id;
    console.log(checklist);
    this.storage.set(checklist, stringifyForm);
    /*this.navCtrl.setRoot(ChecklistSecondPage, {
      id: this.id
    })*/;
  };


}
