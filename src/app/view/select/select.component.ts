import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {DeviceDetectorService} from 'ngx-device-detector';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

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

export class SelectComponent implements OnInit {
  @Input() id;
  @Input() items;

  constructor(public deviceService: DeviceDetectorService) { }

  ngOnInit(): void {
  }

  changeValue(data) {
    const value = (data && data.value) || data;
    this.writeValue(value);
  }

  writeValue(value) {
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
