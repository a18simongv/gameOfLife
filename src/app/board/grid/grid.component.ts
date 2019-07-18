import { Component, OnInit, Input, ChangeDetectorRef,
          ElementRef,ViewChild } from '@angular/core';

import { Square, Position } from '../board.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.sass']
})
export class GridComponent {

  @ViewChild('grid', {"static":true}) gridEl: ElementRef;

  private rows:number = 20;
  private cols:number = 20;

  width=0;
  height=0;

  _grid:Square[][] = [];

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

  private setSize() {
    this.width = this.gridEl.nativeElement.offsetWidth;
    this.height = this.gridEl.nativeElement.offsetHeight;

    this.cols = Math.round(this.gridEl.nativeElement.offsetWidth/15);
    this.rows = Math.round(this.gridEl.nativeElement.offsetHeight/15);

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
    //console.table(this.grid);

  }

  onClick(square) {
    if(square.pos[0] == 0 && square.pos[1] == 0) {
      this.gameLogic();
    } else {
      square.state = !square.state;
    }

  }

  private lifeNeighboor(row:number, col:number):boolean {
    if(row >= 0 && col >= 0 && row != this.rows && col != this.cols) {
      //console.log(row,col);
      return this.grid[row][col].state;
    }
    return false;
  }

  private lifeNeighboors(row:number, col:number):number {
    let lifes:number = 0;

    if( this.lifeNeighboor(row-1,col-1) ) lifes++;
    if( this.lifeNeighboor(row-1,col) ) lifes++;
    if( this.lifeNeighboor(row-1,col+1) ) lifes++;

    if( this.lifeNeighboor(row,col-1) ) lifes++;
    if( this.lifeNeighboor(row,col+1) ) lifes++;

    if( this.lifeNeighboor(row+1,col-1) ) lifes++;
    if( this.lifeNeighboor(row+1,col) ) lifes++;
    if( this.lifeNeighboor(row+1,col+1) ) lifes++;

    return lifes;
  }

  private gameLogic() {
    let posLifes:Position[] = [];
    let posDead:Position[] = [];
    let lifes:number = 0;

    for(let i=0; i<this.rows; i++){

      for(let j=0; j<this.cols; j++) {

        //rules
        lifes = this.lifeNeighboors(i,j);
        if(this.grid[i][j].state) {

          switch(lifes) {
            case 2:{
              posLifes.push(new Position(i,j));
              break;
            }
            case 3:{
              posLifes.push(new Position(i,j));
              break;
            }
            default:
              posDead.push(new Position(i,j));
              break;
          }

        } else {
          if(lifes == 3) posLifes.push(new Position(i,j));//auxGrid[i][j].state = true;
        }

      }
    }

    for(let posL of posLifes) {
      this._grid[posL.pos[0]][posL.pos[1]].state = true;
    }
    for(let posD of posDead) {
      this._grid[posD.pos[0]][posD.pos[1]].state = false;
    }

  }

  get grid():Square[][] {
    return this._grid;
  }

}
