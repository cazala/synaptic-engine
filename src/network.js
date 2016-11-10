import Backend from './backends/paper'

export default class InputLayer {

  constructor (layers) {
    this.backend = new Backend()
    this.engine = this.backend.engine

    // init layers
    layers.forEach(layer => layer.init(this))

    this.layers = this.engine.layers
  }

  addUnit () {
    return this.engine.addUnit()
  }

  addConnection (from, to, weight) {
    return this.engine.addConnection(from, to, weight)
  }

  addGate (from, to, gater) {
    return this.engine.addGate(from, to, gater)
  }

  addLayer (width = 0, height = 1, depth = 1) {
    const units = this.engine.addLayer(width * height * depth)
    return {
      width,
      height,
      depth,
      units,
      size: units.length
    }
  }

  getLastLayer () {
    return this.layers[this.layers.length - 1]
  }
}