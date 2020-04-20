import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-transport-page',
  templateUrl: './transport-page.component.html',
  styleUrls: ['./transport-page.component.scss']
})
export class TransportPageComponent implements OnInit, AfterViewInit {
  @ViewChild('slider', {read: ElementRef}) slider: ElementRef;

  titleId;
  swiper: Swiper;
  breakpoint;

  config;
  modalIsOpen = false;

  constructor() { }


  ngOnInit() {

    this.config = {
      slidesPerView: 1,
      spaceBetween: 20,
      breakpointsInverse: true,
      // breakpoints: {
      //   ['576']: {
      //     slidesPerView: 2,
      //     spaceBetween: 14
      //   }
      // },
      pagination: {
        el: '#transport-pagination',
        clickable: true,
        // dynamicBullets: true
      },
      navigation: {
        nextEl: '#transport-btn-right',
        prevEl: '#transport-btn-left',
      },
    };
  }


  ngAfterViewInit(): void {
    this.breakpoint = window.matchMedia(`(min-width: 992px)`);

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
      // this.swiper.destroy(true, true);
    } else {
      // this.initSwiper();
    }
  }

  openModal() {
    this.modalIsOpen = true;
  }

  closeModal() {
    this.modalIsOpen = false;
    this.titleId = null;
  }

  setTitleId(data: any) {
    this.titleId = data;
  }

  formatTitle() {
    if (this.titleId) {
      return `Заявка на ${this.titleId}`;
    } else {
      return 'Выберите транспорт';
    }
  }
}
