import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export interface ServiceCard {
  id: string;
  name: string;
  preview: string;
  price: string;
  list: any;
}

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss']
})
export class ServiceCardComponent implements OnInit {
  @Input() data;
  @Output() onOpen: EventEmitter<any> = new EventEmitter<any>();

  imageLoading = true;

  constructor() { }

  ngOnInit(): void {

  }

  openModal() {
   this.onOpen.emit(this);
  }

  formatText(text) {
    return text ? text.split('&').join('<br />') : '';
  }

  onLoad() {
    this.imageLoading = false;
  }
}
