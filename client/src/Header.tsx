import React from 'react';

const Header = ({ approvers, quorum }: {approvers: string[], quorum: number}) => (
    <header>
        <ul>
            <li> Approvers: {approvers.join(', ')}</li>
            <li> Quorum: {quorum}</li>
        </ul>
    </header>
);

export default Header;
