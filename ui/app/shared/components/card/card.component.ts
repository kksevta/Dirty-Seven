import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() cardID: any;
  @Input() value: any;
  @Input() suit: any;
  @Output() cardClicked = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  clickCard() {
    this.cardClicked.emit(this.cardID);
  }
}
