import './Global.css';

const TransferList = ({ transfers, approveTransfer }: { transfers: any, approveTransfer: any }) => (
    <div>
        <h2>Transfers</h2>
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Amount</th>
                    <th>To</th>
                    <th>Approvals</th>
                    <th>Sent</th>
                </tr>
            </thead>
            <tbody>
                {transfers.map((transfer: any) => (
                    <tr key={transfer.id}>
                        <td>{transfer.id}</td>
                        <td>{transfer.amount}</td>
                        <td>{transfer.to}</td>
                        <td>
                            {transfer.approvals}
                            <button 
                                onClick={() => approveTransfer(transfer.id)}
                                disabled={(transfer.approvals > 0) ? true : false}>
                                Approve
                            </button>
                        </td>
                        <td>{transfer.sent ? 'yes' : 'no'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default TransferList;
