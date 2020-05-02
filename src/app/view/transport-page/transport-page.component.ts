import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import Swiper from 'swiper';
import {TransportService} from '../../core/services/transport.service';
import {animate, style, transition, trigger} from '@angular/animations';

const TransportMap = {
  'auto-containers': 'Контейнеровоз',
  'auto-towers': 'Автовышка',
  'bulldozers': 'Бульдозер',
  'chambos': 'Илосос',
  'crawler-excavators': 'Экскаватор',
  'front-loaders': 'Фронтальный погрузчик',
  'gasoline-tankers': 'Бензовоз',
  'low-loaders': 'Низкорамный трал',
  'power-stations': 'Электростанция',
  'timber-tracks': 'Сортиментовоз',
  'tippers': 'Самосвал',
  'tractors': 'Трактор'
}

export interface TransportData {
  transportId: string;
  transportPrice: string;
}

@Component({
  selector: 'app-transport-page',
  templateUrl: './transport-page.component.html',
  styleUrls: ['./transport-page.component.scss'],
  animations: [
    trigger('loader', [
      transition(':leave', [
        style({opacity: 1}),
        animate(4000, style({
          opacity: 0
        }))
      ])
    ])
  ]
})
export class TransportPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('slider', {read: ElementRef}) slider: ElementRef;

  transportId;
  transportPrice;
  swiper: Swiper;
  breakpoint;
  promoItems;
  pSub;

  loadedImages = 0;
  imagesLoading = true;
  loaderState = '';

  config;
  modalIsOpen = false;

  constructor(private transportService: TransportService) { }


  ngOnInit() {

    this.config = {
      slidesPerView: 1,
      spaceBetween: 20,
      breakpointsInverse: true,
      updateOnImagesReady: true,
      // autoplay: {
      //   delay: 2000,
      //   stopOnLastSlide: false,
      //   disableOnInteraction: true
      // },
      // loop: true,
      breakpoints: {
        ['576']: {
          slidesPerView: 2,
          spaceBetween: 14
        },
        ['768']: {
          slidesPerView: 1,
          spaceBetween: 14
        }
      },
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

    this.pSub = this.transportService.getPromoItems().subscribe((data) => {
      const tippers = data.length && data.filter((item) => item.id === 'tippers')[0];
      const tippersPos = data.indexOf(tippers);

      data.splice(tippersPos, 1);

      this.promoItems = [tippers, ...data];

      if (this.promoItems) {
        setTimeout(() => {
          this.breakpoint = window.matchMedia(`(min-width: 992px)`);

          this.initSwiper();
          this.checkBreakpoint();
        }, 0);
      }
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
    document.documentElement.classList.add('modal-opened');
  }

  closeModal() {
    this.modalIsOpen = false;
    this.transportId = null;
    document.documentElement.classList.remove('modal-opened');
  }

  setTransportData(data: any) {
    this.transportId = data.id;
    this.transportPrice = data.price;
  }

  formatTitle() {
    return TransportMap[this.transportId];
  }

  ngOnDestroy(): void {
    this.pSub.unsubscribe();
  }

  calculateLoadedImages() {
    this.loadedImages++;

    if (this.promoItems && (this.promoItems.length === this.loadedImages)) {
      setTimeout(() => {
        this.imagesLoading = false;
      }, 0);
    }
  }
}
