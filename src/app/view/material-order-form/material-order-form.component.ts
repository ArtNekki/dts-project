import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';
import {AngularFirestore} from '@angular/fire/firestore';

const Material = {
  sand: 'sand',
  breakstone: 'breakstone',
  shale: 'shale',
  screening: 'screening',
  ground: 'ground',
  pgs: 'pgs',
  gasoline: 'gasoline'
}

const animationDuration = 200;

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
      state('one', style({ position: 'relative',  transform: 'translateX(0)', opacity: 1 })),
      state('two', style({position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, transform: 'translateX(-100%)', opacity: 0})),
      state('three', style({position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, transform: 'translateX(-100%)', opacity: 0 })),
      transition('one => two', animate(animationDuration, keyframes([
        style({ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, offset: 0 }),
        style({ transform: 'translateX(-100%)', offset: 1})
      ]))),
      transition('two => one', animate(animationDuration, keyframes([
        style({ opacity: 1, offset: 0 }),
        style({ transform: 'translateX(0)', offset: 1})
      ])))
    ]),
    trigger('stepTwo', [
      state('one', style({ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, transform: 'translateX(100%)', opacity: 0})),
      state('two', style({position: 'relative', transform: 'translateX(0)', opacity: 1 })),
      state('three', style({position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, transform: 'translateX(-100%)', opacity: 0 })),
      transition('one => two', animate(animationDuration, keyframes([
        style({ position: 'relative', opacity: 1, offset: 0 }),
        style({ transform: 'translateX(0)', offset: 1})
      ]))),
      transition('two => one', animate(animationDuration, keyframes([
        style({ transform: 'translateX(100%)', offset: 1})
      ]))),
      transition('two => three', animate(animationDuration, keyframes([
        style({ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, offset: 0 }),
        style({ transform: 'translateX(-100%)', offset: 1})
      ]))),
      transition('three => two', animate(animationDuration, keyframes([
        style({ opacity: 1, offset: 0 }),
        style({ transform: 'translateX(0)', offset: 1})
      ]))),
    ]),
    trigger('stepThree', [
      state('one', style({ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, transform: 'translateX(100%)', opacity: 0 })),
      state('two', style({position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, transform: 'translateX(100%)', opacity: 0 })),
      state('three', style({position: 'relative', transform: 'translateX(0)', opacity: 1 })),
      transition('two => three', animate(animationDuration, keyframes([
        style({ position: 'relative', opacity: 1, offset: 0 }),
        style({ transform: 'translateX(0)', offset: 1})
      ]))),
      transition('three => two', animate(animationDuration, keyframes([
        style({ transform: 'translateX(100%)', offset: 1})
      ]))),
    ])
  ]
})

export class MaterialOrderFormComponent implements OnInit {
  @Input() data;

  entity: boolean;

  form: FormGroup;
  formSubmitState;

  FormStep = {
    ONE: 'one',
    TWO: 'two',
    THREE: 'three'
  }

  SubmitState = {
    SENDING: 'sending',
    SUCCESS: 'success',
    FAIL: 'fail'
  }

  currentStep = this.FormStep.ONE;
  fieldState = '';

  isMaterial = false;

  materials = [
    {value: Material.sand, name: 'Песок'},
    {value: Material.breakstone, name: 'Щебень'},
    {value: Material.shale, name: 'Сланец'},
    {value: Material.screening, name: 'Отсев'},
    {value: Material.ground, name: 'Грунт'},
    {value: Material.pgs, name: 'Пгс'},
  ]

  constructor(private af: AngularFirestore) { }

  ngOnInit(): void {
    // form init
    this.form = new FormGroup({
      offer: new FormControl('', []),
      message: new FormControl('', []),
      delivery: new FormGroup({
        date: new FormControl(''),
        location: new FormControl(''),
      }),
      personal: new FormGroup({
        userName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        tel: new FormControl('', [Validators.required]),
      })
    });
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

  goToStep(step: string) {
    this.currentStep = step;
  }

  selectType(value: string) {
    if (value === 'material') {
      this.isMaterial = true;
      this.form.addControl('material', new FormControl('', []));
    } else {
      this.isMaterial = false;
      this.form.removeControl('material');
    }

    if (value === 'gasoline') {
      if (this.form.get('materialsCount')) {
        this.form.removeControl('materialsCount');
      }

      this.form.addControl('gasolineCount', new FormControl('', []));

    } else {
      if (this.form.get('gasolineCount')) {
        this.form.removeControl('gasolineCount');
      }

      this.form.addControl('materialsCount', new FormControl('', []));
    }
  }

  onSubmit() {
    if (!this.form.valid) { return; }

    let material = null;

    if (this.form.value.material) {

      material = this.materials.filter((item) => {
        return item.value === this.form.value.material;
      })[0].name;
    }

    const formData = {date: new Date(), ...this.form.value, material};

    this.formSubmitState = this.SubmitState.SENDING;

    this.af.collection('materials-email').add(formData)
    .then((result) => {
      if (result) {
        this.formSubmitState = this.SubmitState.SUCCESS;
        this.form.reset();
      }
    })
    .catch((error) => {
      this.formSubmitState = this.SubmitState.FAIL;
    });
  }
}
