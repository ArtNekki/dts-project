import {Component, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
  @Input() transport: HTMLElement
  @Input() about: HTMLElement
  @Input() features: HTMLElement
  @Input() services: HTMLElement
  @Input() contacts: HTMLElement

  constructor() { }

  ngOnInit() {
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }
}
