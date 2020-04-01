import { Injectable } from '@angular/core';
import {of} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  constructor(private firestore: AngularFirestore) { }

  getListById(id: string) {
    return this.firestore.collection(id).valueChanges();
  }

  getNames() {
    return this.firestore.collection('transport').valueChanges();
  }
}
