import {BrowserModule, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import {registerLocaleData} from '@angular/common';
import ruLocale from '@angular/common/locales/ru';

import { AppComponent } from './app.component';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {HttpClientModule} from '@angular/common/http';
import {HammerConfig} from './hammer.config';
import { PageHeaderComponent } from './view/page-header/page-header.component';
import { TransportComponent } from './view/transport/transport.component';

import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
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
import { TransportPromoComponent } from './view/transport-promo/transport-promo.component';
import { FeaturesComponent } from './view/features/features.component';
import { ContactFormComponent } from './view/contact-form/contact-form.component';
import { ContactBoxComponent } from './view/contact-box/contact-box.component';
import { PageFooterComponent } from './view/page-footer/page-footer.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

registerLocaleData(ruLocale, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    TransportComponent,
    ServicesComponent,
    ModalComponent,
    ServiceOrderFormComponent,
    MainPageComponent,
    TransportPageComponent,
    PageHeaderInnerComponent,
    SidebarComponent,
    TransportListComponent,
    TransportPromoComponent,
    FeaturesComponent,
    ContactFormComponent,
    ContactBoxComponent,
    PageFooterComponent
  ],
  imports: [
    BrowserModule,
    AngularSvgIconModule,
    HttpClientModule,
    SwiperModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [
    {
      provide: [HAMMER_GESTURE_CONFIG, SWIPER_CONFIG],
      useClass: HammerConfig,
      useValue: DEFAULT_SWIPER_CONFIG
    },
    AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
