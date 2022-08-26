import { Outlet, Link } from 'react-router-dom'
import { Fragment } from 'react'
import { ReactComponent as Crownlogo } from '../../assets/crown.svg'
import './navigation.styles.scss';

function Navigation() {
    return (
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <Crownlogo className='logo' />
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>
                        SHOP
                    </Link>
                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation