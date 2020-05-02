import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {TransportService} from '../../core/services/transport.service';
import {Observable} from 'rxjs';
import {TransportItem} from '../transport-box/transport-box.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() transportId;

  items: Array<TransportItem> = [];
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
      this.items = data.sort((a: TransportItem, b: TransportItem) => {
        return a.name.localeCompare(b.name);
      });

      setTimeout(() => {
        this.isLoaded = true;
      }, 1000);
    });
  }

  changeOption(item) {
    this.onChange.emit(item);
  }

}
