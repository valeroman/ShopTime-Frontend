import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
    add_item,
    get_items, get_item_total, get_total
} from '../actions/cart';
import {
    get_products_by_arrival,
    get_products_by_sold
} from '../actions/products';
import {
    add_wishlist_item,
    get_wishlist_items,
    get_wishlist_item_total,
    remove_wishlist_item
} from '../actions/wishlist';
import LandingPage from '../components/LandingPage';

const Home = ({ 
        products_arrival, 
        products_sold,
        get_products_by_arrival,
        get_products_by_sold,
        add_item,
        get_items,
        get_total,
        get_item_total,
        wishlist,
        add_wishlist_item,
        get_wishlist_item_total,
        get_wishlist_items,
        remove_wishlist_item,
        isAuthenticated,
    }) => {

    const [redirect, setRedirect] = useState(false);
    const [loginRedirect, setLoginRedirect] = useState(false);

    useEffect(() =>{
        window.scrollTo(0, 0);

        get_products_by_arrival();
        get_products_by_sold();
    }, [get_products_by_arrival, get_products_by_sold]);

    if (loginRedirect) {
        return <Redirect to='/login' />;
    }

    if (redirect) {
        return <Redirect to='/cart-or-continue-shopping' />;
    }

    return (
        <div>
            <LandingPage 
                products_arrival={ products_arrival}
                products_sold={ products_sold }
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
    )
};

const mapStateToProps = state => ({
    products_arrival: state.products.products_arrival,
    products_sold: state.products.products_sold,
    wishlist: state.wishlist.items,
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
    get_products_by_arrival, 
    get_products_by_sold,
    add_item,
    get_items,
    get_total,
    get_item_total,
    add_wishlist_item,
    get_wishlist_item_total,
    get_wishlist_items,
    remove_wishlist_item,
})(Home);
