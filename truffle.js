const HdProvider = require('truffle-hdwallet-provider')
const mnemonic = 'stamp arch collect second comic carbon custom snake kit between reject category'

module.exports = {
	networks: {
		ropsten: {
			provider: function() {
				return new HdProvider(mnemonic, 'https://ropsten.infura.io', 0)
			},
			network_id: 3,
			gas: 4e6 // This is 4 exponential 6 = 4 million
		},
        development: {
            host: 'localhost',
            port: '8545',
            network_id: '*'
        }
	}
}
