import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss']
})
export class PriceListComponent implements OnInit {
  isCopied = false;

  constructor() { }

  ngOnInit(): void {
  }

  copyLink(el: HTMLInputElement) {
    el.select();
    document.execCommand('copy');

    this.isCopied = true;

    setTimeout(() => {
      this.isCopied = false;
    }, 1500);
  }
}
