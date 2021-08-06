import React, { useState } from 'react';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { activate } from '../actions/auth';

const Activate = ({ match, loading, activate}) => { 

    const [activated, setActivated] = useState(false);

    const activate_account = () => {
        const uid = match.params.uid;
        const token = match.params.token;

        activate(uid, token);
        setActivated(true);
    }

    if (activated && !loading) {
        return <Redirect to='/' />
    }

    return (
        <div className='container'>
            <div 
                className='d-flex justify-content-center align-items-center flex-column'
                style={{ marginTop: '200px' }}
            >
                <h1>Activate your Account:</h1>
                {
                    loading ? (

                        <div className='mt-3 d-flex justify-content-center align-items-center'>
                            <Loader 
                                type='Oval'
                                color='#424242'
                                height={ 50 }
                                width={ 50 }
                            />
                        </div>

                    ) : (
                        <button
                            className='btn btn-primary'
                            style={{ marginTop: '50px' }}
                            type='button'
                            onClick={ activate_account }
                        >
                            Activate
                        </button>
                    )
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    loading: state.auth.loading
});

export default connect(mapStateToProps, {
    activate
}) (Activate);
