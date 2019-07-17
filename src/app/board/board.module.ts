import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid/grid.component';
import { SquareComponent } from './square/square.component';
import { ControlsComponent } from './controls/controls.component';

@NgModule({
  declarations: [GridComponent, SquareComponent, ControlsComponent],
  imports: [
    CommonModule
  ],
  exports: [
    GridComponent
  ]
})
export class BoardModule { }
