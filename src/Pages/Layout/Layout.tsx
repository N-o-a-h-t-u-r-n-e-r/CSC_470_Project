import React from 'react';
import UserIcon from '../../Assets/UserIcon';

interface Props {
    loggedIn: boolean,
}

const Layout: React.FC<React.PropsWithChildren<Props>> = (props) => {

    return (
        <>
            <div className='layout-header'>
                <h1>Gym Rat Lab</h1>
                <button className='user-icon'><UserIcon/></button>
            </div>
            <div className='layout-body'>
                {props.children}
            </div>
        </>
    );
}

export default Layout;