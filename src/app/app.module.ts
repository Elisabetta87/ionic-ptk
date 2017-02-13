import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage} from '../pages/home/home';
import { ChecklistPage } from '../pages/checklist/checklist';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';
import { PropertyForm } from '../components/checklist-form/checklist-form';
import { GeolocationService } from '../services/geolocation-service';
import { ChecklistSecondPage } from '../pages/checklist-second/checklist-second';
import { SecondFormComponent } from '../components/checklist-second-form/checklist-second-form';
import {SecureStorage } from 'ionic-native';
import { ThankYouPage } from '../pages/thank-you/thank-you';
import { LogInPage } from '../pages/log-in/log-in';
import { LogInForm } from '../components/log-in-form/log-in-form';
import { HomePageGuest } from '../pages/home-guest/home-guest';
import { JobsListPage } from '../pages/jobs-list/jobs-list';
import { JobDetailsPage } from '../pages/job-details/job-details';
import { AgmCoreModule } from 'angular2-google-maps/core/core-module';
import { GuestEntryPage } from '../pages/guest-entry/guest-entry';
import { ChecklistStatusPage } from '../pages/checklist-status/checklist-status';
import { MarketPage } from '../pages/market/market';
import { MorePage } from '../pages/more/more';
import { InputNumber } from '../components/input-number/input-number';
import {PtkHttp} from "../services/ptkHttp";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ChecklistPage,
    PropertyForm,
    ChecklistSecondPage,
    SecondFormComponent,
    ThankYouPage,
    LogInPage,
    LogInForm,
    HomePageGuest,
    JobsListPage,
    JobDetailsPage,
    GuestEntryPage,
    ChecklistStatusPage,
    MarketPage,
    MorePage,
    InputNumber
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    ReactiveFormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBJ2KN_uctN7_7YzB_1_DBhNVXgEb74D40'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ChecklistPage,
    PropertyForm,
    SecondFormComponent,
    ChecklistSecondPage,
    ThankYouPage,
    LogInForm,
    LogInPage,
    HomePageGuest,
    JobsListPage,
    JobDetailsPage,
    GuestEntryPage,
    ChecklistStatusPage,
    MarketPage,
    MorePage,
    InputNumber
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GeolocationService,
    SecureStorage,
    {
      provide: PtkHttp,
      useFactory: (backend: XHRBackend, options: RequestOptions) => new PtkHttp(backend, options),
      deps: [XHRBackend, RequestOptions]
    }
  ]
})
export class AppModule {}
