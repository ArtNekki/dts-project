import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {AngularFirestore} from '@angular/fire/firestore';
import {SelectComponent} from '../select/select.component';

const Material = {
  sand: 'sand',
  breakstone: 'breakstone',
  shale: 'shale',
  screening: 'screening',
  ground: 'ground',
  pgs: 'pgs',
  gasoline: 'gasoline'
}

const MaterialPrice = {
  [Material.sand]: '1500',
  [Material.breakstone]: '1000',
  [Material.shale]: '1200',
  [Material.screening]: '1300',
  [Material.ground]: '1900',
  [Material.pgs]: '1500',
  [Material.gasoline]: '1700'
}

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
export class MaterialOrderFormComponent implements OnInit {
  @Input() data;

  entity: boolean;
  form: FormGroup;
  stepTwo = false;
  isMaterial = false;
  currentPrice = null;

  FormSteps = {
    one: 'one',
    two: 'two',
    three: 'three'
  }

  materials = [
    {value: Material.sand, name: 'Песок'},
    {value: Material.breakstone, name: 'Щебень'},
    {value: Material.shale, name: 'Сланец'},
    {value: Material.screening, name: 'Отсев'},
    {value: Material.ground, name: 'Грунт'},
    {value: Material.pgs, name: 'Пгс'},
  ]

  currentStep = this.FormSteps.one;
  fieldState = '';

  constructor(private af: AngularFirestore) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      offer: new FormControl('', []),
      message: new FormControl('', []),
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

  onSubmit() {
    if (!this.form.valid) { return; }

    const variant = {};

    const formData = {date: new Date(), ...this.form.value};

    // this.af.collection('messages').add(formData);
    this.form.reset();

    // this.form.reset();

    console.log(formData);
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
     this.showPrice(Material.gasoline);
   } else {
     this.showPrice(null);
   }
  }

  showPrice(value: any) {
    this.currentPrice = MaterialPrice[value];
    console.log(this.currentPrice);
  }
}
