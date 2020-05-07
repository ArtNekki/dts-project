import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules, ExtraOptions} from '@angular/router';
import {MainPageComponent} from './view/main-page/main-page.component';
import {TransportPageComponent} from './view/transport-page/transport-page.component';
import {TransportListComponent} from './view/transport-list/transport-list.component';
import {TransportPageDetailsComponent} from './view/transport-page-details/transport-page-details.component';

const routerOptions: ExtraOptions = {
  // scrollPositionRestoration: 'enabled',
  // anchorScrolling: 'enabled',
  scrollOffset: [60, 60],
  // onSameUrlNavigation: 'reload'
};

const routes: Routes = [
  {path: '', component: MainPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
