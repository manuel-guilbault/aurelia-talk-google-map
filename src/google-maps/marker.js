import {
  inject,
  noView,
  bindable, 
  bindingMode
} from 'aurelia-framework';
import {Map, Marker} from 'google-maps';
import {EventListeners} from './event-listeners';

@noView
@inject(Map)
export class MarkerCustomElement {
  
  @bindable({ defaultBindingMode: bindingMode.twoWay }) position = null;
  @bindable title = '';
  @bindable draggable = false;
  
  constructor(map) {
    this.map = map;
    this.eventListeners = new EventListeners();
    this.marker = this._createMarker();
  }
  
  _createMarker() {
    return new Marker({
      position: this.position,
      title: this.title,
      draggable: !!this.draggable
    });
  }

  positionChanged(value) {
    if (value) {
      this.marker.setPosition(value);
    }
  }
  
  titleChanged(value) {
    this.marker.setTitle(value);
  }
  
  draggableChanged(value) {
    this.marker.setDraggable(!!value);
  }
  
  bind(bindingContext, overrideContext) {
    this.positionChanged(this.position);
    this.titleChanged(this.title);
    this.draggableChanged(this.draggable);
    
    this.eventListeners.listen(this.marker, 'position_changed', () => {
      this.position = this.marker.getPosition();
    });
  }

  attached() {
    this.marker.setMap(this.map);
  }

  detached() {
    this.marker.setMap(null);
  }
  
  unbind() {
    this.eventListeners.disposeAll();
  }
}