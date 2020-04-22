import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export interface TransportItem {
  id?: string;
  name: string;
  price: string;
  promo?: boolean;
  params?: any;
}

@Component({
  selector: 'app-transport-box',
  templateUrl: './transport-box.component.html',
  styleUrls: ['./transport-box.component.scss']
})

export class TransportBoxComponent implements OnInit {
  @Input() data;
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  goTo(id: string) {
    this.onChange.emit(id);
  }

}
