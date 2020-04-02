import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {
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

  constructor() { }

  ngOnInit(): void {
  }

}
