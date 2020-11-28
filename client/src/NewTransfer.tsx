import React from 'react';

const NewTransfer = ({ createTransfer }: { createTransfer: any }) => {
    const [transfer, setTransfer] = React.useState<any>();

    const submit = (e: any) => {
        e.preventDefault();  // prevent page reload when submitting
        createTransfer(transfer);
    }

    const updateTransfer = (e: any, field: any) => {
        const value = e.target.value;
        setTransfer({ ...transfer, [field]: value });
    };

    return (
        <div>
            <h2> Create transfer </h2>
            <form onSubmit={(e) => submit(e)}>
                <label htmlFor="amount">Amount</label>
                <input
                    id="amount"
                    type="text"
                    onChange={e => updateTransfer(e, 'amount')}
                />
                <label htmlFor="to">To</label>
                <input
                    id="to"
                    type="text"
                    onChange={e => updateTransfer(e, 'to')}
                />
                <button>Submit</button>
            </form>
        </div>
    );
};

export default NewTransfer;