const MultisigWallet = artifacts.require("MultisigWallet");

module.exports = async (deployer, _network, accounts) => {
  await deployer.deploy(MultisigWallet, [accounts[0], accounts[1], accounts[2]], 2);
  const multisigWallet = await MultisigWallet.deployed;
  await web3.eth.sendTransaction({from: accounts[0], to: multisigWallet.address, value: 10000})
};
