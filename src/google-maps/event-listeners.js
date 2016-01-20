import {event} from 'google-maps';

export class EventListeners {
  constructor() {
    this.registrations = [];
  }
  
  add(registration) {
    this.registrations.push(registration);
  }

  listen(instance, eventName, listener) {
    var registration = event.addListener(instance, eventName, listener);
    this.add(registration);
    return registration;
  }

  dispose(registration) {
    var index = this.registrations.indexOf(registration);
    if (index < 0) {
      return false;
    }

    event.removeListener(this.registrations[index]);
    this.registrations.splice(index, 1);
    return true;
  }

  disposeAll() {
    for (var i = 0; i < this.registrations.length; ++i) {
      event.removeListener(this.registrations[i]);
    }
    this.registrations = [];
  }
}
