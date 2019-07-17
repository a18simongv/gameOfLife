import { Component, OnInit, Input, ChangeDetectorRef,
          ElementRef,ViewChild } from '@angular/core';

import { Square } from '../board.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.sass']
})
export class GridComponent {

  @ViewChild('grid', {"static":true}) gridEl: ElementRef;

  private rows:number = 20;
  private cols:number = 20;

  _grid:Square[][] = [];

  private setSize() {
    this.cols = Math.floor(this.gridEl.nativeElement.offsetWidth/15);
    this.rows = Math.floor(this.gridEl.nativeElement.offsetHeight/15);

    console.log(this.rows, this.cols);
  }

  private instanceGrid() {

    for(let i=0; i<this.rows; i++) {
      this._grid[i] = [];

      for(let j=0; j<this.cols; j++) {

        let newPs:number[];
        if(j==0) {
          if(i==0) {
            newPs = [0,0];
          } else {
            newPs = [0, this.grid[i-1][j].pos[1] + 15 ];
          }
        } else {
          newPs = [this.grid[i][j-1].pos[0] + 15, this.grid[i][j-1].pos[1] ];
        }
        this._grid[i][j] = new Square(newPs);
      }

    }
    console.table(this.grid);

  }

  constructor(private ref:ChangeDetectorRef) {
  }

  ngOnInit() {
    this.setSize();
  }


  ngAfterViewInit() {
    //console.log(this.rows,this.cols);

    this.instanceGrid();
    this.ref.detectChanges();
  }

  get grid():Square[][] {
    return this._grid;
  }

}
