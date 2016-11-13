import { ActivationTypes } from '../engine'

export default class ZeroPadding {

  constructor (padding) {
    this.padding = padding
    this.layer = null
  }

  init (network, boundary) {
    this.layer = network.addLayer()

    let x, y, z, from, to
    for (z = 0; z < boundary.depth; z++) {
      for (y = 0; y < boundary.height; y++) {
        for (x = -this.padding; x < boundary.width + this.padding; x++) {

        const unit = network.addUnit(ActivationTypes.IDENTITY)
        this.layer.push(unit)

        // only connect the non-padding units
        if (!this.isPadding(boundary, x, y, z)) {
          to = unit
          from = boundary.layer[x + y * boundary.height + z * boundary.height * boundary.depth]
          network.addConnection(from, to)
        }
      }
    }

    return {
      width: boundary.width + this.padding * 2,
      height: boundary.height,
      depth: boundary.height,
      layer: this.layer
    }
  }

  // returns true if the coords fall within the zero-padding area
  isPadding (boundary, x, y, z) {
    return  x < 0 && x > -this.padding ||
            x > boundary.width && x < boundary.width + this.padding ||
            y < 0 && y > -this.padding ||
            y > boundary.height && y < boundary.height + this.padding
  }
}
