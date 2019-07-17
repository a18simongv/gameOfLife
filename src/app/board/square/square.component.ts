import { Component, OnInit, Input } from '@angular/core';

import { Square } from '../board.service';

@Component({
  selector: '[app-square]',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.sass']
})
export class SquareComponent {

  @Input('data') square:Square;

  constructor() {
    this.square = new Square([15,0],false);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

}
