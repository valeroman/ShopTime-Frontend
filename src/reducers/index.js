import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import cart from './cart';
import categories from './categories';
import products from './products';
import shipping from './shipping';

export default combineReducers({
    auth,
    alert,
    categories,
    products,
    cart,
    shipping
});