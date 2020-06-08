import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules, ExtraOptions} from '@angular/router';
import {MainPageComponent} from './view/main-page/main-page.component';

const routerOptions: ExtraOptions = {
  scrollOffset: [60, 60]
};

const routes: Routes = [
  {path: '', component: MainPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
