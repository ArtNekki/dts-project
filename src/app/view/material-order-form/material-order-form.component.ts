import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-material-order-form',
  templateUrl: './material-order-form.component.html',
  styleUrls: ['./material-order-form.component.scss'],
  animations: [
    trigger('field', [
      transition(':enter', [
        style({opacity: 0}),
        animate(800)
      ])
    ]),
    trigger('stepOne', [
      state('one', style({ position: 'relative', display: 'flex', transform: 'translateX(0)' })),
      state('two', style({transform: 'translateX(-100vw)', position: 'absolute'})),
      transition('one <=> *', animate(200)),
    ]),
    trigger('stepTwo', [
      state('one', style({ position: 'absolute',  transform: 'translateX(100vw)', opacity: 0})),
      state('two', style({transform: 'translateX(0)', position: 'relative', opacity: 1})),
      transition('two <=> *', animate(200)),
    ])
  ]
})
export class MaterialOrderFormComponent implements OnInit {
  entity: boolean;
  form: FormGroup;
  fieldState = '';

  FormSteps = {
    one: 'one',
    two: 'two'
  }

  currentStep = this.FormSteps.one;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      // date: new FormControl(''),
      // location: new FormControl(''),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      tel: new FormControl('', [Validators.required]),
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

  goToStep(step: string) {
    this.currentStep = step;
  }

  onSubmit() {
    if (!this.form.valid) { return; }

    const formData = { date: new Date(), ...this.form.value};

    this.form.reset();

    console.log(formData);
  }

}
