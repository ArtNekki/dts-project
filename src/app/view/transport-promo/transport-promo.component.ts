import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-transport-promo',
  templateUrl: './transport-promo.component.html',
  styleUrls: ['./transport-promo.component.scss']
})
export class TransportPromoComponent implements OnInit {
  @Input() title;
  @Input() img;

  constructor() { }

  ngOnInit(): void {
  }

}
