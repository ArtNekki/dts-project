import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {MainPageComponent} from './view/main-page/main-page.component';
import {TransportPageComponent} from './view/transport-page/transport-page.component';
import {TransportListComponent} from './view/transport-list/transport-list.component';

const routes: Routes = [
  {path: '', component: MainPageComponent, pathMatch: 'full'},
  {path: 'transport', component: TransportPageComponent, children: [
      {path: ':id', component: TransportListComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
