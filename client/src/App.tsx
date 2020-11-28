import React from 'react';
import { getWallet, getWeb3 } from './utils';

function App() {
	const [web3, setWeb3] = React.useState<any>();
	const [accounts, setAccounts] = React.useState<any>();
	const [wallet, setWallet] = React.useState<any>();

	React.useEffect(() => {
		const init = async () => {
			const web3 = getWeb3();
			const accounts = await web3.eth.getAccounts();
			const wallet = await getWallet(web3);
			setWeb3(web3);
			setAccounts(accounts);
			setWallet(wallet);
		};
		init();
	}, []);

	if (
		typeof web3 === 'undefined'
		|| typeof accounts === 'undefined'
		|| typeof wallet === 'undefined'
	) return <div> Loading... </div>;

	return (
		<div>
			<div> Multisig Wallet</div>
			{(accounts)
				? <div> wallet: {accounts[0]} </div>
				: null
			}
			
		</div>
	);
}

export default App;
