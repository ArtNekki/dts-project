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
      state('one', style({ position: 'relative', display: 'flex', transform: 'translateX(0)' })),
      state('two', style({transform: 'translateX(-100vw)', position: 'absolute'})),
      state('three', style({transform: 'translateX(-100vw)', position: 'absolute'})),
      transition('one <=> *', animate(200)),
    ]),
    trigger('stepTwo', [
      state('one', style({ position: 'absolute',  transform: 'translateX(100vw)', opacity: 0})),
      state('two', style({transform: 'translateX(0)', position: 'relative', opacity: 1})),
      state('three', style({transform: 'translateX(-100vw)', position: 'absolute', opacity: 0})),
      transition('two <=> *', animate(200)),
    ]),
    trigger('stepThree', [
      state('one', style({ position: 'absolute',  transform: 'translateX(150vw)', opacity: 0})),
      state('two', style({ position: 'absolute',  transform: 'translateX(150vw)', opacity: 0})),
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
  transportParams = null;
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
      date: new FormControl(''),
      location: new FormControl(''),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', []),
      tel: new FormControl('', [Validators.required]),
      message: new FormControl('', [])
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.currentStep = this.FormSteps.one;

    if (changes.transportId.currentValue) {
      this.transportParams = null;

      if (this.form) {
        this.form.removeControl('params');
      }

      this.transportService.getById(changes.transportId.currentValue)
        .subscribe((data: TransportItem) => {

            if (data.params) {
              this.transportParams = data.params;

              const params = new FormGroup({});

              data.params.forEach((param) => {
                param.items.unshift({name: 'Не выбрано', value: ''});
                params.addControl(param.id, new FormControl(''));
              });

              this.form.addControl('params', params);
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

  goToStep(step: string) {
    this.currentStep = step;
  }
}
