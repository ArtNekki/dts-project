import { Component, OnInit } from '@angular/core';

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

export class ServicesComponent implements OnInit {
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
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        // dynamicBullets: true
      }
    };
  }

  openModal(name: string) {
    this.modal = true;
    this.modalTitle = name;
  }

  setImage(name: string) {
    return `url(assets/img/services/${name}.jpg)`;
  }
}
