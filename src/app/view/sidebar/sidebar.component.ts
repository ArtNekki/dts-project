import { Component, OnInit } from '@angular/core';
import {TransportService} from '../../core/services/transport.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  list$: Observable<any>;

  constructor(private transportService: TransportService) { }

  ngOnInit(): void {
    this.list$ = this.transportService.getNames();
  }

}
