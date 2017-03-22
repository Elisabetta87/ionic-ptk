import { FileOpener, InAppBrowser } from 'ionic-native';
import { Platform } from 'ionic-angular/index';
import { InvoicesService } from './../../services/provider-invoices';
import { Component } from '@angular/core';

declare let cordova:any;
declare let AndroidNativePdfViewer: any;
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

  displayPDF(link, title) {
      this.platform.ready().then(() => {
        let options = { 
                headerColor:"#c0c0c0",
                showScroll:true, 
                showShareButton:true, 
                showCloseButton:true,
                swipeHorizontal:false 
         };
         if(this.platform.is('android')) {
            AndroidNativePdfViewer.openPdfUrl(link, title, options, 
              function(success){
                console.log('File pdf opened!');
              },function(error){
                console.log("Error: " + error);
              }
            );
         } else if(this.platform.is('ios')) {
            FileOpener.open(link, 'application/pdf')
              .then(() => console.log('File is opened'))
              .catch(e => console.log('Error opening file', e)) 
         } else {
            let ref = cordova.InAppBrowser.open(link, '_system', 'location=yes'); 
         }
      }
    );
          
  }
}