import {
  inject,
  noView
} from 'aurelia-framework';
import {Map, LatLng} from 'google-maps';

let nextMapId = 1;

function normalizeElement(element) {
  if (!element.id) {
    element.id = "aurelia-google-maps.map-" + nextMapId++;
  }
  return element;
}

@noView
@inject(Element)
export class MapCustomElement {
  
  constructor(element) {
    this.element = normalizeElement(element);
    this.map = this._createMap();
  }
  
  _createMap() {
    return new Map(this.element, {
      center: new LatLng(0, 0),
      zoom: 10
    });
  }
}