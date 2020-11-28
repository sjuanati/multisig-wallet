// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;
pragma experimental ABIEncoderV2; // to return struct from function

contract MultisigWallet {
    address[] public approvers; // list of approvers
    uint256 public quorum;      // number of approvers to approve a transfer
    struct Transfer {
        uint256 id;
        uint256 amount;
        address payable to;
        uint256 approvals;
        bool sent;
    }
    Transfer[] public transfers; // list of transfers
    mapping(address => mapping(uint256 => bool)) public approvals;
    
    constructor(address[] memory _approvers, uint256 _quorum) public {
        approvers = _approvers;
        quorum = _quorum;
    }
    
    function getApprovers() external view returns(address[] memory) {
        return approvers;
    }
    
    function getTransfers() external view returns(Transfer[] memory) {
        return transfers;
    }
    
    function createTransfer(uint256 amount, address payable to) external onlyApprover {
        transfers.push(Transfer(
            transfers.length,
            amount,
            to,
            0,
            false
        ));
    }
    
    function approveTransfer(uint256 id) external onlyApprover() {
        require(transfers[id].sent == false, 'transfer has already been sent');
        require(approvals[msg.sender][id] == false, 'cannot approve transfer twice');
        // Add approval to transfer
        approvals[msg.sender][id] == true;
        transfers[id].approvals++;
        // Execute transfer if it has enough quorum
        if (transfers[id].approvals >= quorum) {
            transfers[id].sent = true;
            address payable to = transfers[id].to;
            uint256 amount = transfers[id].amount;
            to.transfer(amount);
        }
    }
    
    modifier onlyApprover() {
        bool allowed = false;
        for (uint256 i=0; i < approvers.length; i++) {
            if (approvers[i] == msg.sender) {
                allowed = true;
            }
        }
        require(allowed == true, 'only approver allowed');
        _;
    }
    
    receive() external payable {}
        

}