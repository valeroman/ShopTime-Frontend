import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
    add_item,
    get_items,
    get_item_total,
    get_total
} from '../actions/cart';
import Card from '../components/Card';

const Search = ({
    search_products,
    add_item,
    get_items,
    get_item_total,
    get_total
}) => {

    const [redirect, setRedirect] = useState(false);

    if (redirect) {
        return <Redirect to='/cart-or-continue-shopping' />
    }

    return (
        <div className='container mt-5'>
            <h2 className='text-muted mb-5'>
                Found {
                    search_products &&
                    search_products !== null &&
                    search_products !== undefined &&
                    search_products.length
                } product(s) for you!
            </h2>
            <div className='row'>
                {
                    search_products &&
                    search_products !== null &&
                    search_products !== undefined &&
                    search_products.map((product, index) => (
                        <div key={ index } className='col-4'>
                            <Card 
                                product={ product }
                                add_item={ add_item }
                                get_items={ get_items }
                                get_total={ get_total }
                                get_item_total={ get_item_total }
                                setRedirect={ setRedirect }
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    search_products: state.products.search_products
});

export default connect(mapStateToProps, {
    add_item,
    get_items,
    get_item_total,
    get_total
})(Search)
