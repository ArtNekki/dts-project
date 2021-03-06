import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {DeviceDetectorService} from 'ngx-device-detector';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})

export class SelectComponent implements  ControlValueAccessor {
  @Input() id;
  @Input() items;
  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  value: string;

  constructor(public deviceService: DeviceDetectorService) { }

  changeValue(data) {
    let value = null;

    if (data.stopPropagation) {
      data.stopPropagation();
      value = data.target.value;
    } else {
      value = data.value;
    }

    this.writeValue(value);
    this.change.emit(value);
  }

  writeValue(value) {
    this.value = value;
    this.onChange(value);
  }

  onChange: any = () => {

  }

  onTouched: any = () => {

  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }
}
