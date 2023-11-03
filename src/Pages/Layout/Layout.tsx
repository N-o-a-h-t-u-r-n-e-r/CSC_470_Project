import React from 'react';
import UserIcon from '../../Assets/UserIcon';

interface Props {
    
}

const Layout: React.FC<React.PropsWithChildren<Props>> = (props) => {

    return (
        <>
            <main id='main-content' tabIndex={-1}>
                <div className='layout-header'>
                    <h1>Gym Rat Lab</h1>
                    <button className='user-icon'><UserIcon/></button>
                </div>
                <div className='layout-body'>
                    {props.children}
                </div>
            </main>
        </>
    );
}

export default Layout;