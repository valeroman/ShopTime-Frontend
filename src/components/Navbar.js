import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, Redirect } from 'react-router-dom';
import { logout } from '../actions/auth';
import { get_categories } from '../actions/categories';
import { get_search_products } from '../actions/products';
import Alert from './Alert';
import SearchBox from './SearchBox';



const Navbar = ({ 
    isAuthenticated, 
    logout, 
    searchRedirect, 
    setSearchRedirect ,
    categories,
    get_categories,
    get_search_products
}) => {

    const [render, setRender] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [formData, setFormData] = useState({
        category_id: 0,
        search: ''
    });

    const { category_id, search } = formData;

    useEffect(() => {
        get_categories();
    }, [get_categories]);

    useEffect(() => {
        setSearchRedirect(false);
    }, [render]);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        get_search_products(search, category_id)
        setSearchRedirect(true);
        setRender(!render);
    };

    const logoutHandler = () => {
        logout();
        setRedirect(true);
    };

    const authLinks = (
        <li className='nav-item'>
            <a
                className='nav-link mt-1'
                onClick={ logoutHandler }
                href='#!'
            >
                Logout
            </a>
        </li>
    );

    const guestLinks = (
        <Fragment>
            <li className='nav-item'>
                <NavLink
                    className='nav-link mt-1'
                    to='/login'
                >
                    Login
                </NavLink>
            </li>

            <li className='nav-item'>
                <NavLink
                    className='nav-link mt-1'
                    to='/signup'
                >
                    Sign Up
                </NavLink>
            </li>
        </Fragment>
    );

    const getNavbar = () => (
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
            <div className='container-fluid'>
                <Link className='navbar-brand' to='/'>Shop Time</Link>
                <button 
                    className='navbar-toggler' 
                    type='button' 
                    data-bs-toggle='collapse' 
                    data-bs-target='#navbarNav' 
                    aria-controls='navbarNav' 
                    aria-expanded='false' 
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNav'>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <NavLink 
                                className='nav-link mt-1' 
                                exact 
                                to='/'
                            >
                                Home
                            </NavLink>
                        </li>

                        <SearchBox 
                            search={ search }
                            onChange={ onChange }
                            onSubmit={ onSubmit }
                            categories={ categories }
                        />

                        <li className='nav-item'>
                            <NavLink 
                                className='nav-link mt-1' 
                                to='/shop'
                            >
                                Shop
                            </NavLink>
                        </li>
                        {
                            isAuthenticated ? authLinks : guestLinks
                        }
                        
                    </ul>
                </div>
            </div>
        </nav>
    );

    const renderNavbar = () => {
        if (redirect) {

            return (
                <Fragment>
                    { getNavbar() }
                    <Alert />
                    <Redirect to='/' />
                </Fragment>
            );

        } else {

            return (
                <Fragment>
                    { getNavbar() }
                    <Alert />
                </Fragment>
            );
        }
    };

    return (
        <Fragment>
            { renderNavbar() }
        </Fragment>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    categories: state.categories.categories
});

export default connect(mapStateToProps, {
    logout,
    get_categories,
    get_search_products
})(Navbar);
