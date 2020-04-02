import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-contact-box',
  templateUrl: './contact-box.component.html',
  styleUrls: ['./contact-box.component.scss']
})
export class ContactBoxComponent implements OnInit {
  @Input() icon;
  @Input() title;
  @Input() text;
  @Input() href;

  constructor() { }

  ngOnInit(): void {
  }

}
