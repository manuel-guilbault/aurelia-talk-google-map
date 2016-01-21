import {
  inject, 
  noView,
  processContent,
  bindable,
  bindingMode
} from 'aurelia-framework';
import {Map, Marker, InfoWindow} from 'google-maps';
import {EventListeners} from './event-listeners';

@noView
@processContent(false)
@inject(Map, Marker, Element)
export class InfoWindowCustomElement {

  @bindable({ defaultBindingMode: bindingMode.twoWay }) visible = false;
  opened = false;
  
  constructor(map, marker, element) {
    this.map = map;
    this.marker = marker;
    this.element = element;
    this.eventListeners = new EventListeners();
    this.infoWindow = this._createInfoWindow();
  }
  
  _createInfoWindow() {
    return new InfoWindow({ content: this.element });
  }
  
  visibleChanged(value) {
    if (value && !this.opened) {
      this.open();
    } else if (!value && this.opened) {
      this.close();
    }
  }
  
  bind(bindingContext, overrideContext) {
    this.eventListeners.listen(this.infoWindow, 'closeclick', () => this.visible = false);
  }
  
  attached() {
    if (this.visible) {
      this.open();
    }
  }
  
  detached() {
    if (this.visible) {
      this.close();
    }
  }

  unbind() {
    this.eventListeners.disposeAll();
  }
  
  open() {
    if (!this.opened) {
      this.infoWindow.open(this.map, this.marker);
      this.opened = true;
    }
  }
  
  close() {
    if (this.opened) {
      this.opened = false;
      this.infoWindow.close();
    }
  }
}