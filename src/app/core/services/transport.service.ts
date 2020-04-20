import { Injectable } from '@angular/core';
import {of} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AngularFirestore} from '@angular/fire/firestore';
import {filter, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  constructor(private firestore: AngularFirestore) { }

  getListById(id: string) {
    return this.firestore.collection(id).valueChanges();
  }

  getItems() {
    return this.firestore.collection('transports').valueChanges();
  }

  getPromoItems() {
    return this.firestore.collection<any>('transports').valueChanges()
      .pipe(
        map((data) => {
          return data.filter(item => item.promo);
        })
      );
  }
}
