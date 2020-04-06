import { Component, OnInit } from '@angular/core';
import {TransportService} from '../../core/services/transport.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  // list$: Observable<any>;
  list = [
    {
      id: 'tippers',
      name: 'Самосвалы'
    },
    {
      id: 'timber-tracks',
      name: 'Сортиментовозы'
    },
    {
      id: 'bulldozers',
      name: 'Бульдозера'
    },
    {
      id: 'gasoline-tankers',
      name: 'Бензовозы'
    },
    {
      id: 'power-stations',
      name: 'Электростанции'
    },
    {
      id: 'chambos',
      name: 'Илососы'
    },
    {
      id: 'low-loader',
      name: 'Тралы'
    },
    {
      id: 'crawler-excovators',
      name: 'Эксковаторы гусеничные'
    },
    {
      id: 'auto-towers',
      name: 'Автовышки'
    },
    {
      id: 'front-loaders',
      name: 'Погрузчики фронтальные'
    },
    {
      id: 'auto-containers',
      name: 'Контейнеровозы'
    }
  ]


  constructor(private transportService: TransportService) { }

  ngOnInit(): void {
    // this.list$ = this.transportService.getNames();
  }

}
