import {AfterViewInit, Component, ElementRef, HostListener, InjectionToken, Input, OnInit, ViewChild} from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit, AfterViewInit {
  @Input() transport: HTMLElement;
  @Input() about: HTMLElement;
  @Input() features: HTMLElement;
  @Input() services: HTMLElement;
  @Input() contacts: HTMLElement;
  @ViewChild('header', {read: ElementRef}) header: ElementRef;
  @ViewChild('slider', {read: ElementRef}) slider: ElementRef;

  swiper: Swiper;
  breakpoint;

  config;

  constructor() { }

  ngOnInit() {
    this.config = {
      slidesPerView: 1,
      spaceBetween: 20,
      breakpointsInverse: true,
      breakpoints: {
        ['470']: {
          slidesPerView: 2,
          // spaceBetween: 14
        },
        ['665']: {
          slidesPerView: 3,
          spaceBetween: 0
        }
      },
      pagination: {
        el: '#services-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '#services-btn-right',
        prevEl: '#services-btn-left',
      },
    };
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }

  ngAfterViewInit(): void {
    this.breakpoint = window.matchMedia(`(min-width: 768px)`);

    this.initSwiper();
    this.checkBreakpoint();
  }

  @HostListener('window:resize', ['$event'])

  resize() {
    this.checkBreakpoint();
  }

  initSwiper() {
    if (!this.swiper || !this.swiper.initialized) {
      this.swiper = new Swiper(this.slider.nativeElement, this.config);
    }
  }

  checkBreakpoint() {
    if (this.breakpoint && this.breakpoint.matches) {
      this.swiper.destroy(true, true);
    } else {
      this.initSwiper();
    }
  }

  openMenu() {
    this.header.nativeElement.classList.add('page-header--menu-opened');
    console.log('opened');
  }

  closeMenu() {
    this.header.nativeElement.classList.remove('page-header--menu-opened');
  }
}
