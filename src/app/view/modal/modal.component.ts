import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('modal', [
      // transition(':enter', [
      //   style({opacity: 0}),
      //   animate(400)
      // ])
    ])
  ]
})
export class ModalComponent implements OnInit, OnChanges {
  @Input() title = 'Модальное окно';
  @Input() cssMod: string;
  @Output() close = new EventEmitter<void>();

  modalState = '';

  constructor() { }

  ngOnInit(): void {
    this.title = (this.title.indexOf('&') !== -1) ? this.title.split('&').join('<br />') : this.title;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
  }

}
