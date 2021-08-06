import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import { facebook_autenticate } from '../actions/auth';


const Facebook = ({ facebook_autenticate }) => {

    const [redirect, setRedirect] = useState(false);
    let location = useLocation();

    useEffect(() => {
        const values = queryString.parse(location.search);
        const state = values.state ? values.state : null;
        const code = values.code ? values.code : null;

        if (state && code) {
            const fetchData = async () => {
                await facebook_autenticate(state, code);
                setRedirect(true);
            };
            fetchData();
        }

    }, [location, facebook_autenticate]);

    if (redirect) {
        return <Redirect to='/dashboard' />;
    }

    return (
        <div className='mt-5 d-flex justify-content-center align-items-center'>
            <Loader 
                type='Oval'
                color='#424242'
                height={ 50 }
                width={ 50 }
            />
        </div>
    )
}

export default connect(null, { facebook_autenticate })(Facebook);
