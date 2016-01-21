import {
  inject, 
  noView,
  processContent,
  bindable,
  bindingMode,
  Container,
  ViewCompiler, 
  ViewResources
} from 'aurelia-framework';
import {Map, Marker, InfoWindow} from 'google-maps';
import {compileContent} from './utils';
import {EventListeners} from './event-listeners';

@noView
@processContent(false)
@inject(Map, Marker, Element, Container, ViewCompiler, ViewResources)
export class InfoWindowCustomElement {

  @bindable({ defaultBindingMode: bindingMode.twoWay }) visible = false;
  opened = false;
  
  constructor(map, marker, element, container, compiler, resources) {
    this.map = map;
    this.marker = marker;
    this.container = container;
    
    let contentFactory = compileContent(element, compiler, resources);
    this.contentView = contentFactory.create(this.container.createChild());
    this.contentView.created();
    
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
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;
    
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
      this.contentView.bind(this.bindingContext, this.overrideContext);
      let content = document.createElement('div');
      this.contentView.appendNodesTo(content);
      
      this.infoWindow.setContent(content);
      this.infoWindow.open(this.map, this.marker);
      this.contentView.attached();
      this.opened = true;
    }
  }
  
  close() {
    if (this.opened) {
      this.opened = false;
      this.infoWindow.close();
      this.infoWindow.setContent(null);
      this.contentView.detached();
      this.contentView.removeNodes();
      this.contentView.unbind();
    }
  }
}