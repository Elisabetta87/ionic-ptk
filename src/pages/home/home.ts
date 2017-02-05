import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  constructor(public navCtrl: NavController) {

  }

  /*cordova.plugins.diagnostic.isLocationAvailable(function(available){
    console.log("Location is " + (available ? "available" : "not available"));
  }, function(error){
    console.error("The following error occurred: "+error);
  });
*/

}
