import {
  inject,
  noView,
  bindable, 
  bindingMode
} from 'aurelia-framework';
import {Map, LatLng} from 'google-maps';
import {EventListeners} from './event-listeners';

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
  
  @bindable({ defaultBindingMode: bindingMode.twoWay }) center = new LatLng(0, 0);
  @bindable({ defaultBindingMode: bindingMode.twoWay }) bounds = null;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) zoom = 10;
  
  constructor(element) {
    this.element = normalizeElement(element);
    this.eventListeners = new EventListeners();
    this.map = this._createMap();
  }
  
  _createMap() {
    return new Map(this.element, {
      center: this.center,
      zoom: this.zoom
    });
  }
  
  bind(bindingContext, overrideContext) {
    this.centerChanged(this.center);
    this.boundsChanged(this.bounds);
    this.zoomChanged(this.zoom);
    
    this.eventListeners.listen(this.map, "center_changed", () => {
      this.ignoreNextCenterChanged = true;
      this.center = this.map.getCenter();
    });
    this.eventListeners.listen(this.map, "zoom_changed", () => {
      this.zoom = this.map.getZoom();
    });
    this.eventListeners.listen(this.map, "bounds_changed", () => {
      this.ignoreNextBoundsChanged = true;
      this.bounds = this.map.getBounds();
    });
  }
  
  unbind() {
    this.eventListeners.disposeAll();
  }
  
  centerChanged(value) {
    if (!this.ignoreNextCenterChanged && value) {
      this.map.panTo(value);
    }
    this.ignoreNextCenterChanged = false;
  }

  zoomChanged(value) {
    this.map.setZoom(value);
  }

  boundsChanged(value) {
    if (!this.ignoreNextBoundsChanged && value) {
      this.map.panToBounds(value);
    }
    this.ignoreNextBoundsChanged = false;
  }
}