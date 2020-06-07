import {Component, EventEmitter, Input,  OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() title = 'Модальное окно';
  @Input() cssMod: string;
  @Output() close = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
    this.title = (this.title.indexOf('&') !== -1) ? this.title.split('&').join('<br />') : this.title;
  }
}
