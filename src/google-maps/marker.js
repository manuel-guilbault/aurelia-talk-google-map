import {
  inject,
  inlineView,
  bindable, 
  bindingMode,
  Container
} from 'aurelia-framework';
import {Map, Marker} from 'google-maps';
import {EventListeners} from './event-listeners';

@inlineView('<template><content></content></template>')
@inject(Map, Container)
export class MarkerCustomElement {
  
  @bindable({ defaultBindingMode: bindingMode.twoWay }) position = null;
  @bindable title = '';
  @bindable draggable = false;
  @bindable click = () => {};
  
  constructor(map, container) {
    this.map = map;
    this.eventListeners = new EventListeners();
    this.marker = this._createMarker();
    container.registerInstance(Marker, this.marker);
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
    this.eventListeners.listen(this.marker, 'click', () => {
      this.click();
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