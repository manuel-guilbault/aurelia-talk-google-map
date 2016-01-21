export {MapCustomElement} from './map';
export {MarkerCustomElement} from './marker';

export function configure(config) {
  config.globalResources(
    './map',
    './marker'
  );
};