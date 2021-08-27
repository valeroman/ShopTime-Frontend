import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { reset_password } from '../actions/auth';

const ResetPassword = ({ loading, reset_password }) => {

    const [requestSent, setRequestSent] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
    });

    useEffect(() =>{
        window.scrollTo(0, 0);
    }, []);

    const { email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        reset_password(email);
        setRequestSent(true);
    }

    if (requestSent && !loading) {
        return <Redirect to='/' />
    }

    return (
        <div className='container'>
            <Helmet>
                <meta charSet='utf-8' />
                <meta name="description" content="Helmet application" />
                <title>Shop Time | Reset Password Request</title>
                {/* <link rel='canonical' href='http://shoptime.com/activate' /> */}
            </Helmet>
            <h1 className='mb-3'>Request Password Reset</h1>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                        <input 
                            className='form-control mb-5'
                            type='email'
                            placeholder='Email*'
                            name='email'
                            value={ email }
                            onChange={ e => onChange(e)}
                            required
                        />
                </div>
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
                        <button className='btn btn-primary' type='submit'>
                                Reset Password
                        </button>
                    )
                }
            </form>
        </div>
    )
};

const mapStateToProps = state => ({
    loading: state.auth.loading
});

export default connect(mapStateToProps, { reset_password })(ResetPassword);
