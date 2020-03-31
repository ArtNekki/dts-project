import {BrowserModule, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    ServiceOrderFormComponent
  ],
  imports: [
    BrowserModule,
    AngularSvgIconModule,
    HttpClientModule,
    SwiperModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: [HAMMER_GESTURE_CONFIG, SWIPER_CONFIG],
      useClass: HammerConfig,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
