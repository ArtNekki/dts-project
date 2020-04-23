import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-service-order-form',
  templateUrl: './service-order-form.component.html',
  styleUrls: ['./service-order-form.component.scss']
})
export class ServiceOrderFormComponent implements OnInit {
  @Input() data;

  entity: boolean;
  form: FormGroup;
  stepTwo = false;
  serviceList = [];

  constructor(private af: AngularFirestore) { }

  ngOnInit(): void {
    this.serviceList = this.data.list.length ? [...this.data.list, {value: 0, name: '66666', selected: true}] : null;
    this.form = new FormGroup({
      variant: new FormControl(this.serviceList[2].value, []),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      tel: new FormControl('', [Validators.required]),
      worktime: new FormControl('', []),
      workplace: new FormControl('', []),
      message: new FormControl('', [Validators.required])
    });
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

    const variant = this.serviceList.filter((item) => {
      return this.form.value.variant === item.value;
    })[0];

    const formData = {serviceTitle: this.data.name, variant: variant.name, date: new Date(), ...this.form.value};

    // this.af.collection('messages').add(formData);
    this.form.reset();

    // this.form.reset();

    console.log(formData);
  }
}
