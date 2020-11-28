import Web3 from 'web3';
import MultisigWallet from './contracts/MultisigWallet.json';

const getWeb3 = () => {
    return new Web3('http://127.0.0.1:9545');
};

const getWallet = async (web3: any) => {
    //const networkId = await web3.eth.net.getId();  //TODO: check Typescript complaint
    const networkId = '5777';
    const contractDeployment = MultisigWallet.networks[networkId];
    return new web3.eth.Contract(
        MultisigWallet.abi,
        contractDeployment && contractDeployment.address
    );
};

export { getWeb3, getWallet };
