import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {TransportService} from '../../core/services/transport.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() transportId;

  items = [];
  psub;
  isLoaded = false;

  constructor(private transportService: TransportService) { }

  ngOnInit(): void {
    if (!this.items.length) {
      this.loadItems();
    }
  }

  ngOnDestroy(): void {
    this.psub.unsubscribe();
  }

  loadItems() {
    this.psub = this.transportService.getItems().subscribe((data) => {
      console.log('666', data);
      this.items = data;

      setTimeout(() => {
        this.isLoaded = true;
      }, 1000);
    });
  }

  changeOption(id) {
    this.onChange.emit(id);
  }

}
