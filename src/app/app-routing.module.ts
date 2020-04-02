import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules, ExtraOptions} from '@angular/router';
import {MainPageComponent} from './view/main-page/main-page.component';
import {TransportPageComponent} from './view/transport-page/transport-page.component';
import {TransportListComponent} from './view/transport-list/transport-list.component';

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 0],
};

const routes: Routes = [
  {path: '', component: MainPageComponent, pathMatch: 'full'},
  {path: 'transport', component: TransportPageComponent, children: [
      {path: ':id', component: TransportListComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
