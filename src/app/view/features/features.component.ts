import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})

export class FeaturesComponent implements OnInit, AfterViewInit {
  list = [
    {
      icon: '',
      name: 'Подача техники в день обращения'
    },
    {
      icon: '',
      name: 'Всегда на связи квалифицированный специалист'
    },
    {
      icon: '',
      name: 'Полноценный документооборот'
    },
    {
      icon: '',
      name: 'Работаем без наценок в выходные\n' +
        'и праздники\n' +
        'Техника\n' +
        'ведущих марок\n' +
        'Вся техника обслужена и укомплектована\n' +
        'Всегда\n' +
        'заправлена\n' +
        'Скидка\n'
    },
    {
      icon: '',
      name: 'Техника\n' +
        'ведущих марок'
    },
    {
      icon: '',
      name: 'Вся техника обслужена и укомплектована'
    },
    {
      icon: '',
      name: 'Всегда\n' +
        'заправлена'
    },
    {
      icon: '',
      name: 'Скидка\n' +
        'на второй заказ'
    }
  ];

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
        ['500']: {
          slidesPerView: 2,
          spaceBetween: 14
        },
        ['710']: {
          slidesPerView: 3,
          spaceBetween: 14
        }
      },
      pagination: {
        el: '#features-pagination',
        clickable: true,
        // dynamicBullets: true
      }
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
      this.swiper.destroy(true, true);
    } else {
      this.initSwiper();
    }
  }

}
