import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {MainPageComponent} from './view/main-page/main-page.component';
import {TransportPageComponent} from './view/transport-page/transport-page.component';

const routes: Routes = [
  {path: '', component: MainPageComponent, pathMatch: 'full'},
  {path: 'transport', component: TransportPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
