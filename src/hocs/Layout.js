import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { check_authenticated, loaded_user, refresh } from '../actions/auth';
import Navbar from '../components/Navbar';


const Layout = ({
    check_authenticated,
    loaded_user,
    refresh,
    children
}) => {

    const [searchRedirect, setSearchRedirect] = useState(false);

    useEffect(() => {
        refresh();
        check_authenticated();
        loaded_user();
    }, [refresh, check_authenticated, loaded_user]);

    if (searchRedirect) {
        return (
            <div>
                <Navbar 
                    searchRedirect={ searchRedirect }
                    setSearchRedirect={ setSearchRedirect }
                />
                <Redirect to='/search' />
            </div>
        );
    }

    return (
        <div>
            <Navbar 
                searchRedirect={ searchRedirect }
                setSearchRedirect={ setSearchRedirect }
            />
            { children }
        </div>
    );
}

export default connect(null, {
    check_authenticated,
    loaded_user,
    refresh
})(Layout)
