import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage} from '../pages/home/home';
import { PropertyPage } from '../pages/property/property';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {PropertyForm} from '../components/property-form/property-form';
import {GeolocationService} from '../services/geolocation-service';
import {PropertyDetailsPage} from '../pages/property-details/property-details';
import {SecondFormComponent} from '../components/second-property-form/second-property-form';
import {StorageService} from '../services/storage-service';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PropertyPage,
    PropertyForm,
    PropertyDetailsPage,
    SecondFormComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    ReactiveFormsModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PropertyPage,
    PropertyForm,
    SecondFormComponent,
    PropertyDetailsPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GeolocationService,
    StorageService
  ]
})
export class AppModule {}
