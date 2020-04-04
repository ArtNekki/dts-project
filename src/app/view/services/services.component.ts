import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import Swiper from 'swiper';

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

export class ServicesComponent implements OnInit, AfterViewInit {
  @ViewChild('slider', {read: ElementRef}) slider: ElementRef;

  swiper: Swiper;
  breakpoint;

  config;
  modalTitle;
  modal = false;
  sliders = [
    {
      id: 'service-1',
      title: 'Строительно-земельные работы',
      name: 'land-work'
    },
    {
      id: 'service-2',
      title: 'Рытье траншей\n' + 'и котлованов',
      name: 'land-work'
    },
    {
      id: 'service-3',
      title: 'Благоустройство территории',
      name: 'land-work'
    },
    {
      id: 'service-4',
      title: 'Доставка спецтехники',
      name: 'land-work'
    }
  ];

  constructor() { }

  ngOnInit() {

    this.config = {
      slidesPerView: 3,
      spaceBetween: 20,
      breakpointsInverse: true,
      breakpoints: [],
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        // dynamicBullets: true
      }
    };
  }


  ngAfterViewInit(): void {
    this.breakpoint = window.matchMedia(`(min-width: 600px)`);

    this.initSwiper();
    this.checkBreakpoint();
  }

  @HostListener('window:resize', ['$event'])

  resize() {
    this.checkBreakpoint();
  }

  openModal(name: string) {
    this.modal = true;
    this.modalTitle = name;
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
      this.swiper.destroy(true, true);
    } else {
      this.initSwiper();
    }
  }
}
