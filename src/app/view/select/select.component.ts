import {Component, forwardRef, Input, OnInit} from '@angular/core';
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

  value: string;

  constructor(public deviceService: DeviceDetectorService) { }

  changeValue(data) {
    const value = (data && data.value) || data;
    this.writeValue(value);
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
