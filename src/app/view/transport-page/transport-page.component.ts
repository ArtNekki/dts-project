import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import Swiper from 'swiper';
import {TransportService} from '../../core/services/transport.service';

@Component({
  selector: 'app-transport-page',
  templateUrl: './transport-page.component.html',
  styleUrls: ['./transport-page.component.scss']
})
export class TransportPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('slider', {read: ElementRef}) slider: ElementRef;

  transportId;
  swiper: Swiper;
  breakpoint;
  promoItems;
  pSub;

  config;
  modalIsOpen = false;

  constructor(private transportService: TransportService) { }


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

    this.pSub = this.transportService.getPromoItems().subscribe((data) => {
      this.promoItems = data;


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
  }

  closeModal() {
    this.modalIsOpen = false;
    this.transportId = null;
  }

  setTransportId(data: any) {
    this.transportId = data;
  }

  formatTitle() {
    if (this.transportId) {
      return `Заявка на ${this.transportId}`;
    } else {
      return 'Выберите транспорт';
    }
  }

  ngOnDestroy(): void {
    this.pSub.unsubscribe();
  }
}
