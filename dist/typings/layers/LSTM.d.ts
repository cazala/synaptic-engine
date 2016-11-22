import Network, { BoundaryType } from '../Network';
export default class LSTM {
    memoryBlocks: number;
    peepholes: boolean;
    prevLayer: any;
    nextLayer: any;
    inputGate: any;
    forgetGate: any;
    memoryCell: any;
    outputGate: any;
    constructor(memoryBlocks: number, {peepholes}?: {
        peepholes: boolean;
    });
    init(network: Network, boundary: BoundaryType): BoundaryType;
    reverseInit(network: any, boundary: any): void;
}
