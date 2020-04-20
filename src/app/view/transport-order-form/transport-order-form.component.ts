import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-transport-order-form',
  templateUrl: './transport-order-form.component.html',
  styleUrls: ['./transport-order-form.component.scss']
})
export class TransportOrderFormComponent implements OnInit, OnChanges{
  @Input('id') transportId: string;
  entity: boolean;
  form: FormGroup;
  stepTwo = false;

  constructor(private af: AngularFirestore) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      tel: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required])
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.stepTwo = false;

    if (!changes.transportId.firstChange) {
      this.form.reset();
    }

  }

  selectUserType(id) {
    this.entity = id === 'entity';

    if (id === 'entity') {
      this.form.controls.companyname = new FormControl('', [Validators.required]);
      this.form.controls.companyperson = new FormControl('', [Validators.required]);
      delete this.form.controls.username;

    } else {
      this.form.controls.username = new FormControl('', [Validators.required]);
      delete this.form.controls.companyname;
      delete this.form.controls.companyperson;
    }
  }

  onSubmit() {
    if (!this.form.valid) { return; }

    const formData = { date: new Date(), ...this.form.value};


    // this.af.collection('messages').add(formData);
    this.form.reset();

    // this.form.reset();

    console.log(formData);
  }
}