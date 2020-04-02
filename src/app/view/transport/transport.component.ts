import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {TransportService} from '../../core/services/transport.service';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.scss']
})
export class TransportComponent implements OnInit {
  list$: Observable<any>;
  transportActive = false;

  constructor(private transportService: TransportService) { }

  ngOnInit(): void {
    this.list$ = this.transportService.getNames();
  }

}
