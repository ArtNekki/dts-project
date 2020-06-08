// ANGULAR MODULES
import {BrowserModule, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {ServiceWorkerModule} from '@angular/service-worker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {registerLocaleData} from '@angular/common';
import ruLocale from '@angular/common/locales/ru';
import {HttpClientModule} from '@angular/common/http';
import {AgmCoreModule} from '@agm/core';

// PLUGINS
import {AngularSvgIconModule} from 'angular-svg-icon';
import {HammerConfig} from './hammer.config';

// mask
import {NgxMaskModule, IConfig} from 'ngx-mask';
export let options: Partial<IConfig> | (() => Partial<IConfig>);
//

import {ClipboardModule} from 'ngx-clipboard';
import {NgSelectModule} from '@ng-select/ng-select';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {AngularMyDatePickerModule} from 'angular-mydatepicker';

registerLocaleData(ruLocale, 'ru');

// APPLICATION
import {environment} from '../environments/environment';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';


// CUSTOM COMPONENTS
import {PageHeaderComponent} from './view/page-header/page-header.component';
import {ServicesComponent} from './view/services/services.component';
import {ModalComponent} from './view/modal/modal.component';
import {ServiceOrderFormComponent} from './view/service-order-form/service-order-form.component';
import {MainPageComponent} from './view/main-page/main-page.component';
import {TransportPageComponent} from './view/transport-page/transport-page.component';
import {PageHeaderInnerComponent} from './view/page-header-inner/page-header-inner.component';
import {SidebarComponent} from './view/sidebar/sidebar.component';
import {TransportListComponent} from './view/transport-list/transport-list.component';
import {TransportBoxComponent} from './view/transport-box/transport-box.component';
import {FeaturesComponent} from './view/features/features.component';
import {ContactFormComponent} from './view/contact-form/contact-form.component';
import {ContactBoxComponent} from './view/contact-box/contact-box.component';
import {PageFooterComponent} from './view/page-footer/page-footer.component';
import {MapComponent} from './view/map/map.component';
import {TransportPageDetailsComponent} from './view/transport-page-details/transport-page-details.component';
import {TransportCardComponent} from './view/transport-card/transport-card.component';
import {ContactsComponent} from './view/contacts/contacts.component';
import {ServiceCardComponent} from './view/service-card/service-card.component';
import {FeatureCardComponent} from './view/feature-card/feature-card.component';
import {SwitcherComponent} from './view/switcher/switcher.component';
import {SelectComponent} from './view/select/select.component';
import {DatepickerComponent} from './view/datepicker/datepicker.component';
import {TransportOrderFormComponent} from './view/transport-order-form/transport-order-form.component';
import {LoaderComponent} from './view/loader/loader.component';
import {MaterialsComponent} from './view/materials/materials.component';
import {MaterialOrderFormComponent} from './view/material-order-form/material-order-form.component';
import {PromoComponent} from './view/promo/promo.component';
import {NavComponent} from './view/nav/nav.component';
import {PriceListComponent} from './view/price-list/price-list.component';

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
    FeatureCardComponent,
    SwitcherComponent,
    SelectComponent,
    DatepickerComponent,
    TransportOrderFormComponent,
    LoaderComponent,
    MaterialsComponent,
    MaterialOrderFormComponent,
    PromoComponent,
    NavComponent,
    PriceListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularSvgIconModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxMaskModule.forRoot(options),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    ClipboardModule,
    DeviceDetectorModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: environment.firebaseConfig.apiKey,
      libraries: ['places']
    }),
    AngularMyDatePickerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    {
      provide: [HAMMER_GESTURE_CONFIG],
      useClass: HammerConfig
    },
    AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
