import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-transport-box',
  templateUrl: './transport-box.component.html',
  styleUrls: ['./transport-box.component.scss']
})
export class TransportBoxComponent implements OnInit {
  @Input() title;
  @Input() img;
  @Input() price;
  @Input() labelPosition;

  constructor() { }

  ngOnInit(): void {
  }

}
