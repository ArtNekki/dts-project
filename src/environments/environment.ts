// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {Environment} from './interface';

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyDy38NKqY0dEc4P0rKJHvB5skmvNiFPNk0',
    authDomain: 'dts27-ef353.firebaseapp.com',
    databaseURL: 'https://dts27-ef353.firebaseio.com',
    projectId: 'dts27-ef353',
    storageBucket: 'dts27-ef353.appspot.com',
    messagingSenderId: '112423585491',
    appId: '1:112423585491:web:34e0b80bed576aa8ccf626',
    measurementId: 'G-ZZ2DZSLY25'
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
