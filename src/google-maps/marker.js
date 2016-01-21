import {
  noView,
  bindable, 
  bindingMode
} from 'aurelia-framework';
import {Marker} from 'google-maps';
import {EventListeners} from './event-listeners';

@noView
export class MarkerCustomElement {
  
  @bindable({ defaultBindingMode: bindingMode.twoWay }) position = null;
  @bindable title = '';
  @bindable draggable = false;
  
  constructor() {
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
  
  unbind() {
    this.eventListeners.disposeAll();
  }
}