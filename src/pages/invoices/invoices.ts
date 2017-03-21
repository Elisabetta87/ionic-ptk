import { Platform } from 'ionic-angular/index';
import { InAppBrowser } from 'ionic-native';
import { InvoicesService } from './../../services/provider-invoices';
import { Component } from '@angular/core';

declare let cordova:any;
@Component({
  selector: 'invoices-page',
  templateUrl: 'invoices.html'
})
export class InvoicesPage {

  private invoicesList:Array<Object>; 

  constructor(
      private invoicesService: InvoicesService,
      public platform: Platform
  ){
      this.invoicesList = [];
      for(let e of this.invoicesService.providerInvoices()['info']) {
          this.invoicesList.push(e);
      }
  }

  displayPDF(link) {
      this.platform.ready().then(() => {
          if(this.platform.is('IOS')) {
            let ref = cordova.InAppBrowser.open(link, '_blank', 'location=yes');
          } else if(this.platform.is('Android')) {
            //android code here 
          } else {
            let ref = cordova.InAppBrowser.open(link, '_system', 'location=yes'); 
          }
          
      });
  }

}