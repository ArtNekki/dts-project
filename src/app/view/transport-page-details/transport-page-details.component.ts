import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-transport-page-details',
  templateUrl: './transport-page-details.component.html',
  styleUrls: ['./transport-page-details.component.scss']
})
export class TransportPageDetailsComponent implements OnInit {
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('container', {read: ElementRef}) container: ElementRef;

  @Input() transportId;

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  close() {
    this.router.navigate(['/'], { fragment: 'transport' });
  }

  changeData(id: any) {
   this.onChange.emit(id);
   this.transportId = id;
   this.container.nativeElement.classList.add('transport-details--to-form');
  }

  goBack() {
    this.container.nativeElement.classList.remove('transport-details--to-form');
    this.transportId = null;
    this.onChange.emit(this.transportId);
  }
}
