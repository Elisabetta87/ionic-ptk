import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage} from '../pages/home/home';
import { PropertyPage } from '../pages/property/property';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { PropertyForm } from '../components/property-form/property-form';
import { GeolocationService } from '../services/geolocation-service';
import { PropertyDetailsPage } from '../pages/property-details/property-details';
import { SecondFormComponent } from '../components/second-property-form/second-property-form';
import { SecureStorage } from 'ionic-native';
import { ThankYouPage } from '../pages/thank-you/thank-you';
import { LogInPage } from '../pages/log-in/log-in';
import { LogInForm } from '../components/log-in-form/log-in-form';
import { HomePageGuest } from '../pages/home-guest/home-guest';
import { JobsListPage } from '../pages/jobs-list/jobs-list';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PropertyPage,
    PropertyForm,
    PropertyDetailsPage,
    SecondFormComponent,
    ThankYouPage,
    LogInPage,
    LogInForm,
    HomePageGuest,
    JobsListPage


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
    PropertyDetailsPage,
    ThankYouPage,
    LogInForm,
    LogInPage,
    HomePageGuest,
    JobsListPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GeolocationService,
    SecureStorage
  ]
})
export class AppModule {}
