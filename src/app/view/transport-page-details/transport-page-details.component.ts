import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-transport-page-details',
  templateUrl: './transport-page-details.component.html',
  styleUrls: ['./transport-page-details.component.scss']
})
export class TransportPageDetailsComponent implements OnInit, OnChanges {
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('container', {read: ElementRef}) container: ElementRef;

  @Input() transportId;
  activeClass;

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  close() {
    this.router.navigate(['/'], { fragment: 'transport' });
  }

  changeData(id: any) {
   this.onChange.emit(id);
   this.transportId = id;
   this.container.nativeElement.classList.add('transport-details--selected');
  }

  goBack() {
    this.container.nativeElement.classList.remove('transport-details--selected');
    this.transportId = null;
    this.onChange.emit(this.transportId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('details changes', changes);

    if (changes.transportId.currentValue) {
      this.activeClass = 'transport-details--selected';
    }

    // this.container.nativeElement.classList.add('transport-details--to-form');
  }
}
