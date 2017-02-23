import { Storage } from '@ionic/storage';
import { SecureStorage } from 'ionic-native/dist/es5/index';
import { JobsListPage } from './../jobs-list/jobs-list';
import { NavController } from 'ionic-angular/index';
import { LogInPage } from './../log-in/log-in';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MarketPage} from '../../pages/market/market';
import {MorePage} from '../../pages/more/more';




@Component({
    templateUrl: 'tabs.html',
    providers: [SecureStorage]
})


export class TabsPage {

    
    tabRoots: Array<any> = [
        LogInPage,
        JobsListPage,
        MarketPage,
        MorePage,
        JobsListPage
    ];

    tab1Root: any = this.tabRoots[0];
    tab2Root: any = this.tabRoots[1];
    tab3Root: any = this.tabRoots[2];
    tab4Root: any = this.tabRoots[3];
    tab5Root: any = this.tabRoots[4];


    hasToShowTabs: boolean = false;

    constructor(
        private navCtrl: NavController,
        private Storage: SecureStorage
        ) {
        
    }

}