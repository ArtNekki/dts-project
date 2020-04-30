import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
import {TransportService} from '../../core/services/transport.service';
import {TransportItem} from '../transport-box/transport-box.component';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-transport-order-form',
  templateUrl: './transport-order-form.component.html',
  styleUrls: ['./transport-order-form.component.scss'],
  animations: [
    trigger('field', [
      transition(':enter', [
        style({opacity: 0}),
        animate(800)
      ])
    ]),
    trigger('stepOne', [
      state('one', style({ position: 'relative', display: 'flex', transform: 'translateX(0)', opacity: 1 })),
      state('two', style({transform: 'translateX(-100%)', position: 'absolute', opacity: 0})),
      state('three', style({transform: 'translateX(-100%)', position: 'absolute', opacity: 0})),
      transition('one <=> *', animate(200)),
    ]),
    trigger('stepTwo', [
      state('one', style({ position: 'absolute',  transform: 'translateX(100%)', opacity: 0})),
      state('two', style({transform: 'translateX(0)', position: 'relative', opacity: 1})),
      state('three', style({transform: 'translateX(-100%)', position: 'absolute', opacity: 0})),
      transition('two <=> *', animate(200)),
    ]),
    trigger('stepThree', [
      state('one', style({ position: 'absolute',  transform: 'translateX(100%)', opacity: 0})),
      state('two', style({ position: 'absolute',  transform: 'translateX(100%)', opacity: 0})),
      state('three', style({transform: 'translateX(0)', position: 'relative', opacity: 1})),
      transition('three <=> *', animate(200)),
    ]),
  ]
})
export class TransportOrderFormComponent implements OnInit, OnChanges {
  @Input('id') transportId: string;
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
  entity: boolean;
  form: FormGroup;
  transportModels = null;
  transportProps = null;
  currentTransport = null;
  fieldState = '';

  FormSteps = {
    one: 'one',
    two: 'two',
    three: 'three'
  }

  currentStep = this.FormSteps.one;

  constructor(private af: AngularFirestore, private transportService: TransportService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      rent: new FormGroup({
        date: new FormControl(''),
        location: new FormControl(''),
        period: new FormControl('')
      }),
      personal: new FormGroup({
        userName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        tel: new FormControl('', [Validators.required]),
      }),
      message: new FormControl('', [])
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.currentStep = this.FormSteps.one;

    if (changes.transportId.currentValue) {

      this.transportService.getById('transport', changes.transportId.currentValue)
        .subscribe((data: TransportItem) => {
            this.currentTransport = changes.transportId.currentValue;

            if (data.models.length) {
              this.transportModels = [{value: '', name: 'Не выбрано'}, ...data.models];
              this.form.addControl('model', new FormControl('', Validators.required));
            }
        });
    }

    if (!changes.transportId.firstChange) {
      this.form.reset();
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

    const model = this.transportModels.filter((item) => {
      return item.value === this.form.value.model;
    })[0].name;

    const formData = { date: new Date(), ...this.form.value, model, transport: this.currentTransport};
    console.log('transport', this.currentTransport)

    this.af.collection('transport-email').add(formData);
    this.form.reset();

    console.log(formData);
  }

  goToStep(step: string) {
    this.currentStep = step;
  }

  onChangeParam(value) {
    this.transportService.getById(this.currentTransport, value).subscribe((data) => {
      this.transportProps = data.params;
    });
  }
}
