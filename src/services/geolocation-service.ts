import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import "rxjs/Rx";
import {Geolocation} from 'ionic-native';





@Injectable()
export class GeolocationService {
  
  private googleKey: string = 'AIzaSyBD-ZHc0gh0UI8FHX9FZ05tNsmwLkXstoQ';


  constructor(private http: Http){}


  getGeoPosition() {
    return Geolocation.getCurrentPosition()
  }

  getAddress(coords){
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + coords.latitude + ',' + coords.longitude + '&key=' + this.googleKey)
      .map(data => JSON.parse(data['_body']))
      .map(data => this.addressComposer(data.results[0].address_components))
  }

  public addressComposer(address_components) {
    let address = {};
    for(let index in address_components) {
      switch(address_components[index].types[0]) {
        case 'street_number':
              address['street_number'] = address_components[index].long_name;
        break;
        case 'route':
              address['route'] = address_components[index].long_name;
        break;
        case 'locality':
              address['locality'] = address_components[index].long_name;
        break;
        case 'postal_code':
             address['postal_code'] = address_components[index].long_name;
        break;
      }
    }
    return address;
  }

}



