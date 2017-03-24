import {Injectable} from "@angular/core";
import {PtkHttp} from "./ptkHttp";


@Injectable()
export class InvoicesService {

 private invoicesDict: {};   

  constructor(
    private ptkHttp: PtkHttp
  ){
    this.invoicesDict = {
      'info': [
        {
          'title': '02/03/2017 - 15/03/2017 Invoices',
          'link': 'http://capewrathchallenge.co.uk/Results_files/Half%20Marathon.pdf'    
        },
        {
          'title': '15/03/2017 - 31/03/2017 Invoices',
          'link': 'https://ptkconnect.com/finances/invoice/provider/30/2017/3/second_half/view/'
        }
      ]
    }
  }

  providerInvoices() {
    return this.invoicesDict;
  }

}