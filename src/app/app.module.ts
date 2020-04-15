import {BrowserModule, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import {registerLocaleData} from '@angular/common';
import ruLocale from '@angular/common/locales/ru';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {HttpClientModule} from '@angular/common/http';
import {HammerConfig} from './hammer.config';
import { PageHeaderComponent } from './view/page-header/page-header.component';

// mask
import { NgxMaskModule, IConfig } from 'ngx-mask';
export let options: Partial<IConfig> | (() => Partial<IConfig>);


// import { SwiperModule } from 'ngx-swiper-wrapper';
// import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
// import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ServicesComponent } from './view/services/services.component';
import { ModalComponent } from './view/modal/modal.component';
import { ServiceOrderFormComponent } from './view/service-order-form/service-order-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MainPageComponent } from './view/main-page/main-page.component';
import { TransportPageComponent } from './view/transport-page/transport-page.component';
import {AppRoutingModule} from './app-routing.module';
import { PageHeaderInnerComponent } from './view/page-header-inner/page-header-inner.component';
import { SidebarComponent } from './view/sidebar/sidebar.component';
import { TransportListComponent } from './view/transport-list/transport-list.component';
import {environment} from '../environments/environment';
import {AngularFirestore} from '@angular/fire/firestore';
import { TransportBoxComponent } from './view/transport-box/transport-box.component';
import { FeaturesComponent } from './view/features/features.component';
import { ContactFormComponent } from './view/contact-form/contact-form.component';
import { ContactBoxComponent } from './view/contact-box/contact-box.component';
import { PageFooterComponent } from './view/page-footer/page-footer.component';
import { MapComponent } from './view/map/map.component';
import { TransportPageDetailsComponent } from './view/transport-page-details/transport-page-details.component';
import { TransportCardComponent } from './view/transport-card/transport-card.component';
import {NgSelectModule} from '@ng-select/ng-select';
import { ContactsComponent } from './view/contacts/contacts.component';
import { ServiceCardComponent } from './view/service-card/service-card.component';
import { FeatureCardComponent } from './view/feature-card/feature-card.component';
import { ServiceWorkerModule } from '@angular/service-worker';

// const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
//   direction: 'horizontal',
//   slidesPerView: 'auto'
// };

registerLocaleData(ruLocale, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    ServicesComponent,
    ModalComponent,
    ServiceOrderFormComponent,
    MainPageComponent,
    TransportPageComponent,
    PageHeaderInnerComponent,
    SidebarComponent,
    TransportListComponent,
    TransportBoxComponent,
    FeaturesComponent,
    ContactFormComponent,
    ContactBoxComponent,
    PageFooterComponent,
    MapComponent,
    TransportPageDetailsComponent,
    TransportCardComponent,
    ContactsComponent,
    ServiceCardComponent,
    FeatureCardComponent
  ],
  imports: [
    BrowserModule,
    AngularSvgIconModule,
    HttpClientModule,
    // SwiperModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxMaskModule.forRoot(options),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDXu6wNP79AG7OHTlyBMRufLdjdvSmwo0A',
      libraries: ['places']
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    {
      provide: [HAMMER_GESTURE_CONFIG],
      useClass: HammerConfig,
      // useValue: DEFAULT_SWIPER_CONFIG
    },
    AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
