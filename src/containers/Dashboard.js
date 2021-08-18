import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    get_items,
    get_item_total,
    get_total
} from '../actions/cart';
import { list_orders } from '../actions/orders';

const Dashboard = ({
    get_item_total,
    get_items,
    get_total,
    list_orders,
    orders,
    user
}) => {

    const [display, setDisplay] = useState('user_info');

    useEffect(() => {
        get_item_total();
        get_items();
        get_total();
        list_orders();
    },[]);

    const showStatus = (status) => {
        if (status === 'not_processed') {
            return 'Not Process';
        } else if (status === 'processed') {
            return 'Processed';
        } else if (status === 'shipped') {
            return 'Shipping';
        } else if (status === 'delivered') {
            return 'Delivered';
        } else if (status === 'cancelled') {
            return 'Cancelled';
        }
    };

    const userInfo = () => {
        return (
            <div className='card mb-5'>
                <h3 className='card-header'>User Information</h3>
                <ul className='list-group'>
                    <li className='list-group-item'>
                        <strong>First Name: </strong>
                        {
                            user &&
                            user !== null &&
                            user !== undefined ?
                            user.first_name : <Fragment></Fragment>
                        }
                    </li>

                    <li className='list-group-item'>
                        <strong>Last Name: </strong>
                        {
                            user &&
                            user !== null &&
                            user !== undefined ?
                            user.last_name : <Fragment></Fragment>
                        }
                    </li>

                    <li className='list-group-item'>
                        <strong>Email: </strong>
                        {
                            user &&
                            user !== null &&
                            user !== undefined ?
                            user.email : <Fragment></Fragment>
                        }
                    </li>
                </ul>
            </div>
        );
    };

    const purchaseHistory = () => {
        return (
            <div className='card mb-5'>
                <h3 className='card-header'>
                    Purchase History
                </h3>
                <div className='card-body'>
                    {
                        orders &&
                        orders !== null &&
                        orders !== undefined &&
                        orders.map((order, index) => (
                            <div key={ index }>
                                <h3
                                    className='mb-3'
                                    style={{ 
                                        color: '#b12704',
                                        fontSize: '24px'
                                     }}
                                >
                                    Order { index + 1}
                                </h3>
                                <ul className='list-group mb-3'> 
                                     <li className='list-group-item'>
                                         <div>
                                            <h3
                                                className='text-muted mb-3'
                                                style={{ 
                                                    fontSize: '18px'
                                                }}
                                            >
                                                Order Status: { showStatus(order.status) }
                                            </h3>
                                            <h3
                                                className='text-muted mb-3'
                                                style={{ 
                                                    fontSize: '18px'
                                                }}
                                            >
                                                Order Details:
                                            </h3>
                                            <ul className='list-group mb-3'>
                                                <li className='list-group-item'>
                                                    Transaction ID: { order.transaction_id }
                                                </li>
                                                <li className='list-group-item'>
                                                    Total Cost of Order: ${ order.amount.toFixed(2) }
                                                </li>
                                            </ul>
                                            <h3
                                                className='text-muted mb-3'
                                                style={{ 
                                                    fontSize: '18px'
                                                }}
                                            >
                                                Additional Info:
                                            </h3>
                                            <ul className='list-group mb-3'>
                                                <li className='list-group-item'>
                                                    Shipping Price: ${ order.shipping_price.toFixed(2) }
                                                </li>
                                                <li className='list-group-item'>
                                                    Order Created: { moment(order.date_issued).fromNow() }
                                                </li>
                                            </ul>
                                         </div>
                                         <Link
                                            className='btn btn-info'
                                            to={`/dashboard/order-detail/${ order.transaction_id }`}
                                         >
                                            Order Details
                                         </Link>
                                     </li>
                                </ul>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    };

    const renderData = () => {
        if ( display === 'user_info') {
            return (
                <Fragment>
                    { userInfo() }
                </Fragment>
            );
        } else if (display === 'purchase_history') {
            return (
                <Fragment>
                    { purchaseHistory() }
                </Fragment>
            );
        }
    };

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-3'>
                    <div className='card'>
                        <h3 className='card-header'>
                            Dashboard Links
                        </h3>
                        <ul className='list-group'>
                            <li 
                                className='list-group-item'
                                style={{ cursor: 'pointer' }}
                                onClick={() => setDisplay('user_info')}
                            >
                                {
                                    display === 'user_info' ? (
                                        <strong>User Info</strong>
                                    ) : (
                                        <Fragment>User Info</Fragment>
                                    )
                                }
                            </li>
                            <li 
                                className='list-group-item'
                                style={{ cursor: 'pointer' }}
                                onClick={() => setDisplay('purchase_history')}
                            >
                                {
                                    display === 'purchase_history' ? (
                                        <strong>Payment History</strong>
                                    ) : (
                                        <Fragment>Payment History</Fragment>
                                    )
                                }
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='col-9'>
                    { renderData() }
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = state => ({
    orders: state.orders.orders,
    user: state.auth.user
});

export default connect(mapStateToProps,{
    list_orders,
    get_item_total,
    get_items,
    get_total
})(Dashboard);
