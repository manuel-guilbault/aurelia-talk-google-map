import {
  inject,
  noView
} from 'aurelia-framework';
import {Map} from 'google-maps';

@noView
@inject(Element)
export class MapCustomElement {
  
  constructor(element) {
    this.element = element;
    this.map = this._createMap();
  }
  
  _createMap() {
    return new Map(this.element, {
    });
  }
}