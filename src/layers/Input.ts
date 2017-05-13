import Network, { Boundary, Layer } from '../Network';

export default class Input implements Layer {

  layer: number[];

  constructor(public size: number) { }

  init(network: Network, boundary: Boundary): Boundary {

    if (boundary != null) {
      throw new Error('\'Input\' must be the first layer of the network!');
    }

    this.layer = network.addLayer(this.size);
    // set the boundary for next layer
    return {
      width: this.size,
      height: 1,
      depth: 1,
      layer: this.layer
    };
  }
}
