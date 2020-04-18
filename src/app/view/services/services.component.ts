import {AfterViewInit, Component, ElementRef, HostListener, OnInit, OnDestroy, ViewChild} from '@angular/core';
import Swiper from 'swiper';
import {ServicesService} from '../../core/services/services.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})

// interface Slider {
//   id: string;
//   title: string;
//   name?: string;
// }

export class ServicesComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('slider', {read: ElementRef}) slider: ElementRef;
  @ViewChild('sliderWrapper', {read: ElementRef}) sliderWrapper: ElementRef;

  items;
  pSub;

  swiper: Swiper;
  breakpoint;

  config;
  serviceTitle;
  serviceList;
  modal = false;

  constructor(private servicesService: ServicesService) { }

  ngOnInit() {

    this.config = {
      slidesPerView: 1,
      spaceBetween: 0,
      breakpointsInverse: true,
      breakpoints: {
        ['576']: {
          slidesPerView: 2,
          spaceBetween: 14
        },
        ['820']: {
          slidesPerView: 3,
          spaceBetween: 14
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

    this.pSub = this.servicesService.getItems().subscribe((data) => {
      this.items = data;

      if (this.items) {
        this.sliderWrapper.nativeElement.classList.remove('swiper--services');

        setTimeout(() => {
          this.breakpoint = window.matchMedia(`(min-width: 992px)`);

          this.initSwiper();
          this.checkBreakpoint();
        }, 0);
      }
    },

    () => {

    },
    () => {

    });
  }


  ngAfterViewInit(): void {
    // this.breakpoint = window.matchMedia(`(min-width: 992px)`);
    //
    // this.initSwiper();
    // this.checkBreakpoint();
  }

  @HostListener('window:resize', ['$event'])

  resize() {
    this.checkBreakpoint();
  }

  openModal(event) {
    this.modal = true;
    this.serviceTitle = event.data.name;
    this.serviceList = event.data.list.length ? [...event.data.list, {value: 0, name: '66666', selected: true}] : null;
  }

  setImage(name: string) {
    return `url(assets/img/services/${name}.jpg)`;
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

  ngOnDestroy(): void {
    this.pSub.unsubscribe();
  }
}
