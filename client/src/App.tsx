import React from 'react';
import { getWallet, getWeb3 } from './utils';
import Header from './Header';
import NewTransfer from './NewTransfer';
import TransferList from './TransferList';

function App() {
	const [web3, setWeb3] = React.useState<any>();
	const [accounts, setAccounts] = React.useState<string[]>([]);
	const [wallet, setWallet] = React.useState<any>();
	const [approvers, setApprovers] = React.useState<string[]>();
	const [quorum, setQuorum] = React.useState<number>();
	const [transfers, setTransfers] = React.useState<any[]>([]);

	React.useEffect(() => {
		const init = async () => {
			let web3: any;
			web3 = await getWeb3();
			const accounts = await web3.eth.getAccounts();
			const wallet = await getWallet(web3);
			const approvers = await wallet.methods.getApprovers().call();
			const quorum = await wallet.methods.quorum().call();
			const transfers = await wallet.methods.getTransfers().call();
			setWeb3(web3);
			setAccounts(accounts);
			setWallet(wallet);
			setApprovers(approvers);
			setQuorum(quorum);
			setTransfers(transfers);
		};
		init();
	}, []);

	const createTransfer = (transfer: any) => {
		wallet.methods
			.createTransfer(transfer.amount, transfer.to)
			.send({from: accounts[0]});
	};

	const approveTransfer = (transferId: any) => {
		wallet.methods
			.approveTransfer(transferId)
			.send({from: accounts[0]});
	};

	if (
		typeof web3 === 'undefined'
		|| typeof accounts === 'undefined'
		|| typeof wallet === 'undefined'
		|| typeof approvers === 'undefined'
		|| typeof quorum === 'undefined'
	) return <div> Loading... </div>;

	return (
		<div>
			<div> Multisig Wallet</div>
			{/* {(accounts)
				? <div> wallet: {accounts[0]} </div>
				: null
			} */}
			<Header approvers={approvers} quorum={quorum} />
			<NewTransfer createTransfer={createTransfer} />
			<TransferList transfers={transfers} approveTransfer={approveTransfer}/>
		</div>
	);
};

export default App;
