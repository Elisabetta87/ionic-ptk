import {Injectable} from "@angular/core";
import "rxjs/Rx";
import {PtkHttp} from "./ptkHttp";
import { URLs } from './URLs';




@Injectable()
export class PropertyInfoService {

 private propertyInfo: {};   

  constructor(
    private ptkHttp: PtkHttp
  ){
    this.propertyInfo = {
      'id': 100, // random - this is the Property's ID
      'info': [
        {
          'title': 'Photos',
          'slides': [
            {
              'text': 'Here is a photo of the front door',
              'photo_url': 'img/img-property-1.jpg',
            },
            {
              'text': 'Here is a photo of the shower',
              'photo_url': 'img/img-property-2.jpg',
            },
          ],
        },
        {
          'title': 'Linen Info',
          'slides': [
            {
              'text': 'Here is where the linen is stored',
              'photo_url': 'img/img-property-1.jpg',
            },
          ],
        },
        {
          'title': 'Rubbish Info',
          'slides': [
            {
              'text': 'Here is where the bin is',
              'photo_url': 'img/img-property-1.jpg',
            },
          ],
        },
        {
          'title': 'Special Requirements',
          'slides': [
            {
              'text': 'Please adhere to the following special requirements: ...',
              'photo_url': 'img/img-property-1.jpg',
            },
          ],
        },
      ]
    }
  }

  propertyInfoObj() {
    return this.propertyInfo;
  }

}