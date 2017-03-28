import { MenuService } from './../../services/menu';
import { Component } from '@angular/core';


@Component({
  selector: 'page-log-in',
  templateUrl: 'log-in.html'
})
export class LogInPage {

  constructor(
    private menu: MenuService
  ){}

  // ionViewWillEnter() {
  //   this.menu.hideMenu();
  // }
}