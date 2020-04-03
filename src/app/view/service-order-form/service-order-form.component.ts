import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-service-order-form',
  templateUrl: './service-order-form.component.html',
  styleUrls: ['./service-order-form.component.scss']
})
export class ServiceOrderFormComponent implements OnInit {
  @Input() serviceTitle;

  entity: boolean;
  addInfo: false;
  form: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      // variant: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      tel: new FormControl('', [Validators.required]),
      worktime: new FormControl('', []),
      workplace: new FormControl('', []),
      message: new FormControl('', [Validators.required])
    });
  }

  selectUserType(type) {
    this.entity = type === 'entity';

    if (type === 'entity') {
      this.form.controls.companyname = new FormControl('', [Validators.required]);
      delete this.form.controls.username;

    } else {
      this.form.controls.username = new FormControl('', [Validators.required]);
      delete this.form.controls.companyname;
    }
  }

  onSubmit() {
    if (!this.form.valid) { return; }

    const formData = {serviceTitle: this.serviceTitle, ...this.form.value};
    this.form.reset();

    console.log(formData);
  }
}
