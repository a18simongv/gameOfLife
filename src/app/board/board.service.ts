import { Injectable } from '@angular/core';

export class Square {

  private _state:boolean;
  private _background:string;
  private _pos:number[];

  constructor(pos?:number[],state?:boolean) {
    this.state = state || false;
    this._pos = pos || [0,0];
  }

  private setBackground() {
    this._state == true ? this._background='white' : this._background='black';
  }

  get background() {
    return this._background;
  }

  set state(value:boolean) {
    this._state = value;
    this.setBackground();
  }

  get state():boolean {
    return this._state;
  }

  get pos():number[] {
    return this._pos;
  }

}

export class Position {
  pos:number[];

  constructor(x:number,y:number) {
    this.pos = [x,y];
  }
}

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor() { }
}
