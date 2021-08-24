import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
    add_item,
    get_items, get_item_total, get_total
} from '../actions/cart';
import {
    add_wishlist_item, get_wishlist_items, get_wishlist_item_total, remove_wishlist_item
} from '../actions/wishlist';
import Card from '../components/Card';

const WishList = ({
    wishlist,
    total_items,
    add_item,
    get_items,
    get_total,
    get_item_total,
    get_wishlist_item_total,
    get_wishlist_items,
    add_wishlist_item,
    remove_wishlist_item,
    isAuthenticated
}) => {

    const [loginRedirect, setLoginRedirect] = useState(false);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);

        get_wishlist_item_total();
        get_wishlist_items();
    },[]);

    if (loginRedirect) {
        return <Redirect to='/login' />;
    }

    if (redirect) {
        return <Redirect to='/cart-or-continue-shopping' />
    }

    return (
        <div className='container mt-5'>
            <h2>Your Items:</h2>
            <h4 className='text-muted mt-3'>
                Your wishlist has { total_items } item(s)
            </h4>
            <hr />
            <div className='row'>
                {
                    wishlist &&
                    wishlist !== null &&
                    wishlist !== undefined &&
                    wishlist.map((item, index) => (
                        <div key={ index }className='col-4'>
                            <Card 
                                product={ item.product }
                                add_item={ add_item }
                                get_items={ get_items }
                                get_total={ get_total }
                                get_item_total={ get_item_total }
                                wishlist={ wishlist }
                                add_wishlist_item={ add_wishlist_item }
                                get_wishlist_item_total={ get_wishlist_item_total }
                                get_wishlist_items={ get_wishlist_items }
                                remove_wishlist_item={ remove_wishlist_item }
                                isAuthenticated={ isAuthenticated }
                                setLoginRedirect={ setLoginRedirect }
                                setRedirect={ setRedirect }
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
};

const mapStateToProps = state => ({
    wishlist: state.wishlist.items,
    total_items: state.wishlist.total_items,
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
    add_item,
    get_items,
    get_total,
    get_item_total,
    get_wishlist_item_total,
    get_wishlist_items,
    add_wishlist_item,
    remove_wishlist_item,
})(WishList);
