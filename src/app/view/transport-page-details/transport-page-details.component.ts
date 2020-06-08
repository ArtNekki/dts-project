import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-transport-page-details',
  templateUrl: './transport-page-details.component.html',
  styleUrls: ['./transport-page-details.component.scss']
})
export class TransportPageDetailsComponent implements OnInit, OnChanges {
  @Input() transportId;
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('container', {read: ElementRef}) container: ElementRef;

  activeClass;
  isLoaded = true;

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.transportId.currentValue) {
      this.activeClass = 'transport-details--selected';
    }
  }

  changeData(item: any) {
   this.onChange.emit(item);
   this.transportId = item.id;
   this.container.nativeElement.classList.add('transport-details--selected');

   this.isLoaded = false;

   setTimeout(() => {
     this.isLoaded = true;
   }, 1000);
  }

  goBack() {
    this.container.nativeElement.classList.remove('transport-details--selected');
    this.transportId = null;
    this.onChange.emit({id: this.transportId, name: null, price: null});
  }
}
