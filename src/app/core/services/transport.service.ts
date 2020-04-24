import { Injectable } from '@angular/core';
import {of} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AngularFirestore} from '@angular/fire/firestore';
import {filter, map, tap} from 'rxjs/operators';
import {TransportItem} from '../../view/transport-box/transport-box.component';

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  constructor(private firestore: AngularFirestore) { }

  getListById(id: string) {
    return this.firestore.collection(id).valueChanges();
  }

  getItems() {
     return this.firestore.collection('transport').snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map(a => {
            const id = a.payload.doc.id;
            const data = a.payload.doc.data() as TransportItem;
            return {id, ...data};
          });
        })
      );
  }

  getById(id) {
    return this.firestore.collection('transport').doc(id).valueChanges()
      .pipe(
        map((data: TransportItem) => {
          return {id, ...data};
        })
      );
  }

  getPromoItems() {
    return this.firestore.collection('transport').snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map(a => {
            const id = a.payload.doc.id;
            const data = a.payload.doc.data() as TransportItem;
            return {id, ...data};
          });
        }),
        map((items) => items.filter((item) => item.promo))
      );
  }
}
