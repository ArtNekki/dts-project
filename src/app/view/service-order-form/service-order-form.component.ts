import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-service-order-form',
  templateUrl: './service-order-form.component.html',
  styleUrls: ['./service-order-form.component.scss'],
  animations: [
    trigger('field', [
      transition(':enter', [
        style({opacity: 0}),
        animate(800)
      ])
    ]),
    trigger('stepOne', [
      state('one', style({ position: 'relative', display: 'block', transform: 'translateX(0)' })),
      state('two', style({transform: 'translateX(-100%)', position: 'absolute'})),
      transition('one <=> *', animate(200)),
    ]),
    trigger('stepTwo', [
      state('one', style({ position: 'absolute',  transform: 'translateX(100%)', opacity: 0})),
      state('two', style({transform: 'translateX(0)', position: 'relative', opacity: 1})),
      transition('two <=> *', animate(200)),
    ])
  ]
})
export class ServiceOrderFormComponent implements OnInit {
  @Input() data;

  entity: boolean;
  form: FormGroup;
  stepTwo = false;
  serviceList = [];

  FormSteps = {
    one: 'one',
    two: 'two',
    three: 'three'
  }

  currentStep = this.FormSteps.one;
  fieldState = '';

  constructor(private af: AngularFirestore) { }

  ngOnInit(): void {
    this.serviceList = (this.data.list && this.data.list.length) ? [...this.data.list, {value: '', name: 'Не выбрано', selected: true}] : null;

    this.form = new FormGroup({
      variant: new FormControl('', []),
      message: new FormControl('', []),
      personal: new FormGroup({
        userName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        tel: new FormControl('', [Validators.required]),
      })
    });

    if (this.data.id.indexOf('rental') === -1) {
      const workGroup = new FormGroup({
        time: new FormControl('', []),
        place: new FormControl('', []),
      });

      this.form.addControl('work', workGroup);
    }
  }

  selectUserType(id) {
    this.entity = id === 'entity';

    if (id === 'entity') {
      (this.form.get('personal') as FormGroup).removeControl('userName');
      (this.form.get('personal') as FormGroup).addControl('companyName', new FormControl('', [Validators.required]));
      (this.form.get('personal') as FormGroup).addControl('companyPerson', new FormControl('', [Validators.required]));
    } else {
      (this.form.get('personal') as FormGroup).addControl('userName', new FormControl('', [Validators.required]));
      (this.form.get('personal') as FormGroup).removeControl('companyName');
      (this.form.get('personal') as FormGroup).removeControl('companyPerson');
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

  setTitleLabel(id: any) {
   if (id.indexOf('cargo') !== -1) {
     return 'Выберите груз';
   } else if (id.indexOf('work') !== -1) {
      return 'Выберите работу';
   } else if (id.indexOf('rental') !== -1) {
     return 'Выберите обьект аренды';
   }
  }

  setDateLabel(id: any) {
    if (id.indexOf('cargo') !== -1) {
      return 'Когда нужно доставить?';
    } else if (id.indexOf('work') !== -1) {
      return 'Когда нужно выполнить?';
    }
  }

  setLocationLabel(id: any) {
    if (id.indexOf('cargo') !== -1) {
      return 'Адрес доставки';
    } else if (id.indexOf('work') !== -1) {
      return 'По каком адресу?';
    }
  }

  goToStep(step: string) {
    this.currentStep = step;
  }
}
