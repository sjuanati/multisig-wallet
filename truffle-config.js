const path = require('path');
const fs = require('fs');
const provider = require('@truffle/hdwallet-provider');
const secrets = JSON.parse(
	fs.readFileSync('.secrets.json').toString().trim()
);

// const infuraKey = "fj4jll3k.....";
//
// const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
	contracts_build_directory: path.join(__dirname, 'client/src/contracts'),
	networks: {
		kovan: {
			provider: () => new provider(
				secrets.privateKeys,
				`https://kovan.infura.io/v3/${secrets.infuraKey}`,
				0, // from address 0
				3,  // to address 3
			),
			network_id: 42,
		},
		// development: {
		//  host: "127.0.0.1",     // Localhost (default: none)
		//  port: 8545,            // Standard Ethereum port (default: none)
		//  network_id: "*",       // Any network (default: none)
		// },
	},

	// Set default mocha options here, use special reporters etc.
	mocha: {
		// timeout: 100000
	},

	// Configure your compilers
	compilers: {
		solc: {
			version: "0.6.12",    // Fetch exact version from solc-bin (default: truffle's version)
			// docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
			// settings: {          // See the solidity docs for advice about optimization and evmVersion
			//  optimizer: {
			//    enabled: false,
			//    runs: 200
			//  },
			//  evmVersion: "byzantium"
			// }
		}
	}
};
