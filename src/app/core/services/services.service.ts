import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {TransportItem} from '../../view/transport-box/transport-box.component';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private firestore: AngularFirestore) { }

  getItems() {
    return this.firestore.collection('services').snapshotChanges()
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
}
