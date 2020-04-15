import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-feature-card',
  templateUrl: './feature-card.component.html',
  styleUrls: ['./feature-card.component.scss']
})
export class FeatureCardComponent implements OnInit {
  @Input() text: string;
  @Input() marked: boolean;
  @Input() name: string;

  constructor() { }

  ngOnInit(): void {
  }

}
