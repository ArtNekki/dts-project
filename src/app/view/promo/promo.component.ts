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
  smBreakpoint = false;

  constructor() { }

  ngOnInit(): void {
    this.config = {
      slidesPerView: 1,
      spaceBetween: 20,
      autoplay: {
        delay: 2000,
        stopOnLastSlide: false,
        disableOnInteraction: true
      },
      loop: true,
      breakpointsInverse: true,
      breakpoints: {
        ['576']: {
          slidesPerView: 2,
          // autoplay: null
          // spaceBetween: 14
        },
        ['710']: {
          slidesPerView: 3,
          spaceBetween: 0,
          // loop: true,
          autoplay: false
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

    this.smBreakpoint = window.matchMedia(`(max-width: 576px)`).matches;
  }

  ngAfterViewInit(): void {
    this.breakpoint = window.matchMedia(`(min-width: 768px)`);

    this.initSwiper();
    this.checkBreakpoint();
  }

  @HostListener('window:resize', ['$event'])

  resize() {
    this.checkBreakpoint();
    this.smBreakpoint = window.matchMedia(`(max-width: 576px)`).matches;
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
