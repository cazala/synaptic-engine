import Network, { IBoundary } from '../Network';
export default class Input3D {
    width: number;
    height: number;
    depth: number;
    layer: number[];
    constructor(width: number, height: number, depth: number);
    init(network: Network, boundary: IBoundary): IBoundary;
}