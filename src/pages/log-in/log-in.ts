import { StorageST } from './../../services/StorageST';
import { JobsListPage } from './../jobs-list/jobs-list';
import { MenuService } from './../../services/menu';
import { Component } from '@angular/core';
import { NavController, Platform } from "ionic-angular/index";


@Component({
  selector: 'page-log-in',
  templateUrl: 'log-in.html'
})
export class LogInPage {

  constructor(
    public navCtrl: NavController,
    private menuService: MenuService,
    private platform: Platform
  ){}

  ionViewDidEnter() {
    this.menuService.hideMenu(); 
  }
}