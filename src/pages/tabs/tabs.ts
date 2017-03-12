import { KeyboardAttachDirective } from './../../directives/keyboard-attach-directive';
import { MessengerPage } from './../messenger/messenger';
import { StorageST } from './../../services/StorageST';
import { SecureStorage } from 'ionic-native';
import { JobsListPage } from './../jobs-list/jobs-list';
import { MarketPage} from '../../pages/jobs-list/market';
import { NavController } from 'ionic-angular/index';
import { LogInPage } from './../log-in/log-in';
import { Component } from '@angular/core';
import {MorePage} from '../../pages/more/more';




@Component({
    templateUrl: 'tabs.html',
    providers: [SecureStorage, StorageST, KeyboardAttachDirective]
})


export class TabsPage {

    
    tabRoots: Array<any> = [
        LogInPage,
        JobsListPage,
        MarketPage,
        MorePage,
        MessengerPage
    ];

    tab1Root: any = this.tabRoots[0];
    tab2Root: any = this.tabRoots[1];
    tab3Root: any = this.tabRoots[2];
    tab4Root: any = this.tabRoots[3];
    tab5Root: any = this.tabRoots[4];


    hasToShowTabs: boolean = false;

    constructor(
        private navCtrl: NavController,
        private storage: SecureStorage
        ) {}   

}