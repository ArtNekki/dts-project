import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss']
})
export class PriceListComponent implements OnInit {
  @ViewChild('inputTarget', {read: ElementRef}) input: ElementRef;
  isCopied = false;

  constructor() { }

  ngOnInit(): void {}

  copied() {
    this.isCopied = true;
    this.input.nativeElement.blur();

    setTimeout(() => {
      this.isCopied = false;
    }, 1500);
  }
}
