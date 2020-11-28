const { expectRevert } = require('@openzeppelin/test-helpers')
const MultisigWallet = artifacts.require('MultisigWallet');

contract('MultisigWallet', (accounts) => {
    let multisigWallet;

    beforeEach(async () => {
        multisigWallet = await MultisigWallet.new([accounts[0], accounts[1], accounts[2]], 2);
        await web3.eth.sendTransaction({ from: accounts[0], to: multisigWallet.address, value: 1000 })
    });

    it('should have correct approvers and quorum', async () => {
        const approvers = await multisigWallet.getApprovers();
        const quorum = await multisigWallet.quorum();
        assert(approvers.length === 3);
        assert(approvers[0] === accounts[0]);
        assert(approvers[1] === accounts[1]);
        assert(approvers[2] === accounts[2]);
        assert(quorum.toNumber() === 2);  // do not use .toNumber() for wei/ethers. Use .toString() instead
    });

    it('should create transfers', async () => {
        await multisigWallet.createTransfer(100, accounts[5], { from: accounts[0] });
        const transfers = await multisigWallet.getTransfers();
        // Numbers that are fields of a struct are not wrapped in BN.js, so need to use strings
        assert(transfers.length === 1);
        assert(transfers[0].id === '0');
        assert(transfers[0].amount === '100');
        assert(transfers[0].to === accounts[5]);
        assert(transfers[0].approvals === '0');
        assert(transfers[0].sent === false);

    });
    /*
        it('should NOT create transfers if sender is not approved', async () => {
            await expectRevert(
                await multisigWallet.createTransfer(100, accounts[5], { from: accounts[4] }),
                'only approver allowed'
            );
        });
    */

    it('should increment approvals', async () => {
        await multisigWallet.createTransfer(100, accounts[5], { from: accounts[0] });
        await multisigWallet.approveTransfer(0, { from: accounts[0] });
        const transfers = await multisigWallet.getTransfers();
        const balance = await web3.eth.getBalance(multisigWallet.address);
        assert(transfers[0].approvals === '1');
        assert(transfers[0].sent === false);
        assert(balance === '1000');
    });

    it('should send transfer if quorum reached', async () => {
        const balanceBefore = web3.utils.toBN(await web3.eth.getBalance(accounts[5]));
        await multisigWallet.createTransfer(100, accounts[5], { from: accounts[0] });
        await multisigWallet.approveTransfer(0, { from: accounts[0] });
        await multisigWallet.approveTransfer(0, { from: accounts[1] });
        const balanceAfter = web3.utils.toBN(await web3.eth.getBalance(accounts[5]));
        const transfers = await multisigWallet.getTransfers();
        const balance = await web3.eth.getBalance(multisigWallet.address);
        assert(transfers[0].approvals === '2');
        assert(transfers[0].sent === true);
        assert(balance === '900');
        assert(balanceAfter.sub(balanceBefore).toNumber() == 100);
    });

    it('should NOT approve transfer if sender is not approved', async () => {
        await multisigWallet.createTransfer(100, accounts[5], { from: accounts[0] });
        await expectRevert(
            await multisigWallet.approveTransfer(0, { from: accounts[4] }),
            'only approver allowed'
        );
    });

    it.only('should NOT approve transfer if it is already sent', async () => {
        await multisigWallet.createTransfer(100, accounts[5], { from: accounts[0] });
        await multisigWallet.approveTransfer(0, { from: accounts[0] });
        await multisigWallet.approveTransfer(0, { from: accounts[1] });
        await expectRevert(
            await multisigWallet.approveTransfer(0, { from: accounts[2] }),
            'transfer has already been sent'
        );
    });

    it.only('should NOT approve transfer twice', async () => {
        await multisigWallet.createTransfer(100, accounts[5], { from: accounts[0] });
        await multisigWallet.approveTransfer(0, { from: accounts[0] });
        await expectRevert(
            await multisigWallet.approveTransfer(0, { from: accounts[0] }),
            'cannot approve transfer twice'
        );
    });


});
