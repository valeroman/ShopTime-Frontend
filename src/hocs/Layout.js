import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { check_authenticated, loaded_user, refresh } from '../actions/auth';
import {
    get_items,
    get_item_total,
    get_total
} from '../actions/cart';
import Navbar from '../components/Navbar';


const Layout = ({
    check_authenticated,
    loaded_user,
    refresh,
    get_items, 
    get_item_total, 
    get_total,
    children,
}) => {

    const [searchRedirect, setSearchRedirect] = useState(false);

    useEffect(() => {
        refresh();
        check_authenticated();
        loaded_user();
        get_items(); 
        get_item_total(); 
        get_total();
    }, []);

    if (searchRedirect) {
        return (
            <div>
                <Navbar 
                    setSearchRedirect={ setSearchRedirect }
                />
                <Redirect to='/search' />
            </div>
        );
    }

    return (
        <div>
            <Navbar 
                setSearchRedirect={ setSearchRedirect }
            />
            { children }
        </div>
    );
}

export default connect(null, {
    check_authenticated,
    loaded_user,
    refresh,
    get_items, 
    get_item_total, 
    get_total
})(Layout)
