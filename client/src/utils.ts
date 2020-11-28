import Web3 from 'web3';
import MultisigWallet from './contracts/MultisigWallet.json';
declare let window: any;

// const getWeb3 = () => {
//     return new Web3('http://127.0.0.1:9545');
// };

const getWeb3 = () => {
    return new Promise(async (resolve, reject) => {
        window.addEventListener('load', async() => { // ensure browser plugins are loaded
            if (window.ethereum) {
                const web3 = new Web3(window.ethereum);
                try {
                    await window.ethereum.enable();
                    resolve(web3);
                } catch(err) { // in case the User refuses to grant access
                    reject(err);
                };
            } else if (window.web3) {
                resolve(window.web3);
            } else {
                reject('Must install Metamask');
            };
        });
    });
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
