const synaptic = process.env.NODE_ENV == 'node' ? require('../../dist') : require('../../dist/synaptic')
const testBackend = require('../../utils/backendSharedTests')
console.log('Testing node version ' + process.versions.node);

describe('Backends', () => {
  testBackend('WASM', synaptic.backends.WASM)
  //testBackend('CPU', synaptic.backends.CPU)
  //testBackend('ASM', synaptic.backends.ASM, { logLevel: 2 })
})
