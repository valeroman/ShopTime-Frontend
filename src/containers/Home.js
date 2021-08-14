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
import LandingPage from '../components/LandingPage';

const Home = ({ 
        products_arrival, 
        products_sold,
        get_products_by_arrival,
        get_products_by_sold,
        add_item,
        get_items,
        get_total,
        get_item_total
    }) => {

    const [redirect, setRedirect] = useState(false);

    useEffect(() =>{
        window.scrollTo(0, 0);

        get_products_by_arrival();
        get_products_by_sold();
    }, [get_products_by_arrival, get_products_by_sold]);

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
                setRedirect={ setRedirect }
            />
        </div>
    )
};

const mapStateToProps = state => ({
    products_arrival: state.products.products_arrival,
    products_sold: state.products.products_sold
});

export default connect(mapStateToProps, {
    get_products_by_arrival, 
    get_products_by_sold,
    add_item,
    get_items,
    get_total,
    get_item_total,
})(Home);
