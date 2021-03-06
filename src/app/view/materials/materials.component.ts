import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.scss']
})
export class MaterialsComponent implements OnInit {
  modal = false;

  constructor() { }

  ngOnInit(): void {
  }

  openModal() {
    this.modal = true;
    document.documentElement.classList.add('modal-opened');
  }

  closeModal() {
    this.modal = false;
    document.documentElement.classList.remove('modal-opened');
  }
}
