// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {Environment} from './interface';

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyA8w9se--vse-UUJgw7i_xQrcLiMdTO9e4',
    authDomain: 'dts-d6e0c.firebaseapp.com',
    databaseURL: 'https://dts-d6e0c.firebaseio.com',
    projectId: 'dts-d6e0c',
    storageBucket: 'dts-d6e0c.appspot.com',
    messagingSenderId: '783579306093',
    appId: '1:783579306093:web:e8ef6d0ac991be8d14c764',
    measurementId: 'G-7N6EF8SRKF'
  }
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
