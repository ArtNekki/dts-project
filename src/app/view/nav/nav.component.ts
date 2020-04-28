import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, AfterViewInit {
  @ViewChild('nav', {read: ElementRef}) nav: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.setStickyMenu();
  }

  @HostListener('window:scroll', ['$event'])

  scroll(event) {
    this.setStickyMenu();
  }

  setStickyMenu() {
    if (this.nav.nativeElement.getBoundingClientRect().top < -30) {
      document.documentElement.classList.add('nav-sticky');
    } else {
      document.documentElement.classList.remove('nav-sticky');
    }
  }

  openMenu() {
    document.documentElement.classList.add('menu-opened');
    document.documentElement.classList.add('modal-opened');
  }

  closeMenu() {
    document.documentElement.classList.remove('menu-opened');
    document.documentElement.classList.remove('modal-opened');
  }
}
