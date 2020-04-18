import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-service-order-form',
  templateUrl: './service-order-form.component.html',
  styleUrls: ['./service-order-form.component.scss']
})
export class ServiceOrderFormComponent implements OnInit {
  @Input() serviceTitle;
  @Input() serviceList;

  entity: boolean;
  addInfo: false;
  form: FormGroup;
  stepTwo = false;

  constructor(private af: AngularFirestore) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      variant: new FormControl('', []),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      tel: new FormControl('', [Validators.required]),
      worktime: new FormControl('', []),
      workplace: new FormControl('', []),
      message: new FormControl('', [Validators.required])
    });

    console.log('list', this.serviceList);
  }

  selectUserType(id) {
    console.log(console.log('id', id));
    this.entity = id === 'entity';

    if (id === 'entity') {
      this.form.controls.companyname = new FormControl('', [Validators.required]);
      delete this.form.controls.username;

    } else {
      this.form.controls.username = new FormControl('', [Validators.required]);
      delete this.form.controls.companyname;
    }
  }

  onSubmit() {
    if (!this.form.valid) { return; }

    const variant = this.serviceList.filter((item) => {
      return this.form.value.variant === item.value;
    })[0];

    console.log('ccccc', variant);

    const formData = {serviceTitle: this.serviceTitle, variant: variant.name, date: new Date(), ...this.form.value};


    // this.af.collection('messages').add(formData);
    this.form.reset();

    // this.form.reset();

    console.log(formData);
  }
}
