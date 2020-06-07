import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
import {TransportService} from '../../core/services/transport.service';
import {TransportItem, TransportModel} from '../transport-box/transport-box.component';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';

const animationDuration = 200;

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

export class TransportOrderFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input('id') transportId: string;
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  entity: boolean;

  form: FormGroup;
  formSubmitState;

  transportModels = null;
  currentTransport = null;
  modelProps = null;
  isModelPropsLoading = false;

  transportSubscribe = null;
  modelSubscribe = null;

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

  constructor(private af: AngularFirestore, private transportService: TransportService) { }

  ngOnInit(): void {
    // form init
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
    // when select new transport in sidebar, set form's step to first step
    this.currentStep = this.FormStep.ONE;

    if (changes.transportId.currentValue) {
      this.formSubmitState = null;
      this.transportModels = null;
      this.modelProps = null;

      // if transport's ID got, we load model's characteristic data from database for current transport
      // and add a new form's control
      this.transportSubscribe = this.transportService.getById('transport', changes.transportId.currentValue)
        .subscribe((data: TransportItem) => {
          this.currentTransport = changes.transportId.currentValue;

          if (data.models.length) {
            this.transportModels = [{value: '', name: 'Не выбрано'}, ...data.models];
            this.form.addControl('model', new FormControl('', Validators.required));
          }
      });
    }

    // when transport selected in sidebar, we reset form's data
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

  goToStep(step: string) {
    this.currentStep = step;
  }

  changeModel(value) {
    this.modelProps = null;

    // Get model's characteristics
    if (value) {
      this.isModelPropsLoading = true;

      this.modelSubscribe = this.transportService.getById(this.currentTransport, value).subscribe((data: TransportItem) => {
        this.modelProps = data.params;

        if (this.modelProps) {
          this.isModelPropsLoading = false;
        }
      });
    }
  }

  ngOnDestroy(): void {

    if (this.transportSubscribe) {
      this.transportSubscribe.unsubscribe();
    }

    if (this.modelSubscribe) {
      this.modelSubscribe.unsubscribe();
    }
  }

  onSubmit() {
    if (!this.form.valid) { return; }

    const model = this.transportModels.filter((item) => {
      return item.value === this.form.value.model;
    })[0].name;

    const formData = { date: new Date(), ...this.form.value, model, transport: this.currentTransport};
    console.log('formData', formData);

    this.formSubmitState = this.SubmitState.SENDING;

    this.af.collection('transport-email').add(formData)
      .then((result) => {

        if (result) {
          this.formSubmitState = this.SubmitState.SUCCESS;
          this.form.reset();
          this.modelProps = null;
        }
      })
      .catch((error) => {
        this.formSubmitState = this.SubmitState.FAIL;
      });
  }
}
