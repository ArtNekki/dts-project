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

  // ngAfterViewInit(): void {
  //   this.setStickyMenu();
  // }
  //
  // @HostListener('window:scroll', ['$event'])
  //
  // scroll(event) {
  //   this.setStickyMenu();
  // }
  //
  // setStickyMenu() {
  //   if (this.header.nativeElement.getBoundingClientRect().top < -30) {
  //     document.documentElement.classList.add('nav-sticky');
  //   } else {
  //     document.documentElement.classList.remove('nav-sticky');
  //   }
  // }
  //
  // openMenu() {
  //   this.header.nativeElement.classList.add('page-header--menu-opened');
  //   document.documentElement.classList.add('modal-opened');
  // }
  //
  // closeMenu() {
  //   this.header.nativeElement.classList.remove('page-header--menu-opened');
  //   document.documentElement.classList.remove('modal-opened');
  // }
}
