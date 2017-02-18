import {Component} from '@angular/core';
import {JobsListPage} from '../../pages/jobs-list/jobs-list';
//import {MarketPage} from '../..pages/market/market';
//import {MorePage} from '../../pages/more/more';




@Component({
    selector: 'menu',
    templateUrl: 'menu.html'
})


export class MenuComponent {

  tab1Root = JobsListPage;
  //tab2Root = MarketPage;
  //tab3Root = MorePage;
  tab4Root = JobsListPage;

    constructor() {}

    
}