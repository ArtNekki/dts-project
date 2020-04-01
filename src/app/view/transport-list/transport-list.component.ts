import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TransportService} from '../../core/services/transport.service';
import {switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-transport-list',
  templateUrl: './transport-list.component.html',
  styleUrls: ['./transport-list.component.scss']
})
export class TransportListComponent implements OnInit {
  list$: Observable<any>;
  list;

  constructor(
    private route: ActivatedRoute,
    private transportService: TransportService) { }

  ngOnInit() {
    this.list$ = this.route.params.pipe(
      switchMap((params) => {
        return this.transportService.getListById(params.id);
      })
    );

    // this.route.params.subscribe((p) => {
    //   this.list =
    // });

    // console.log('list', this.list$);
  }

}
