import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss']
})
export class PromoComponent implements OnInit, AfterViewInit {
  @ViewChild('slider', {read: ElementRef}) slider: ElementRef;

  swiper: Swiper;
  breakpoint;

  config;

  constructor() { }

  ngOnInit(): void {
    this.config = {
      slidesPerView: 1,
      spaceBetween: 20,
      breakpointsInverse: true,
      breakpoints: {
        ['576']: {
          slidesPerView: 2,
          // spaceBetween: 14
        },
        ['710']: {
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

}
