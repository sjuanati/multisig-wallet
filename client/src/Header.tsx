import './Header.css';

const Header = ({ approvers, quorum }: { approvers: string[], quorum: number }) => (

    <div className={'item'}>
        <div className={'description'}>
            Approvers
        </div>
        <div>
            {approvers.map((elem) => <div key={elem}> {elem} </div>)}
        </div>
    </div>

);

export default Header;
