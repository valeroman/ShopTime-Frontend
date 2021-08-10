import React from 'react';
import { connect } from 'react-redux';
import Card from '../components/Card';

const Search = ({
    search_products
}) => {


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
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
};

const mapStateToProps = state => ({
    search_products: state.products.search_products
});

export default connect(mapStateToProps, {})(Search)
