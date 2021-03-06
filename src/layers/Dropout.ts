import Network, { Boundary, Layer } from '../Network';
import { Activations } from 'lysergic';

export default class Dropout implements Layer {

  gater: number[] = null;
  layer: number[] = null;

  constructor(public chances: number) { }

  init(network: Network, boundary: Boundary): Boundary {

    if (boundary == null) {
      throw new Error('\'Dropout\' can\'t be the first layer of the network!');
    }

    this.gater = network.addLayer();
    this.layer = network.addLayer();

    let unit: number, from: number, to: number; // , gate: number
    for (let i = 0; i < boundary.layer.length; i++) {
      unit = network.addUnit(Activations.ActivationTypes.IDENTITY);
      this.layer.push(unit);

      from = boundary.layer[i];
      to = unit;

      // add a connection with a fixed weight of 1
      network.addConnection(from, to, 1);

      // this unit will act as a gate, randomly dropping inputs
      // const gate = network.addUnit(ActivationTypes.DROPOUT);
      const gate = network.addUnit(Activations.ActivationTypes.IDENTITY);
      network.addGate(from, to, gate);
      this.gater.push(gate);
      // use the unit's state to store the chances to drop
      network.compiler.heap.setVariable('state', gate, this.chances);
      // self-connect the unit so it keeps its state
      network.addConnection(gate, gate);
    }

    // this layer doesn't change the boundary's dimensions
    return {
      width: boundary.width,
      height: boundary.height,
      depth: boundary.depth,
      layer: this.layer
    };
  }
}
