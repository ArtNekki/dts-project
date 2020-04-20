import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-transport-page-details',
  templateUrl: './transport-page-details.component.html',
  styleUrls: ['./transport-page-details.component.scss']
})
export class TransportPageDetailsComponent implements OnInit {
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
  transportId;

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  close() {
    this.router.navigate(['/'], { fragment: 'transport' });
  }

  changeData(id: any) {
   this.onChange.emit(id);
   this.transportId = id;
  }
}
