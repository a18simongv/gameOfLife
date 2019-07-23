import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid/grid.component';
import { SquareComponent } from './square/square.component';

@NgModule({
  declarations: [GridComponent, SquareComponent],
  imports: [
    CommonModule
  ],
  exports: [
    GridComponent
  ]
})
export class BoardModule { }
