export {MapCustomElement} from './map';
export {MarkerCustomElement} from './marker';
export {InfoWindowCustomElement} from './info-window';

export function configure(config) {
  config.globalResources(
    './map',
    './marker',
    './info-window'
  );
};