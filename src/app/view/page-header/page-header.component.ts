import {AfterViewInit, Component, ElementRef, HostListener, InjectionToken, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
  @Input() transport: HTMLElement;
  @Input() about: HTMLElement;
  @Input() features: HTMLElement;
  @Input() services: HTMLElement;
  @Input() contacts: HTMLElement;
  @ViewChild('header', {read: ElementRef}) header: ElementRef;

  constructor() { }

  ngOnInit() {

  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }

  openMenu() {
    this.header.nativeElement.classList.add('page-header--menu-opened');
    document.documentElement.classList.add('modal-opened');
  }

  closeMenu() {
    this.header.nativeElement.classList.remove('page-header--menu-opened');
    document.documentElement.classList.remove('modal-opened');
  }
}
