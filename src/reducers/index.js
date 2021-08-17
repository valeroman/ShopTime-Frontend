import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import cart from './cart';
import categories from './categories';
import payment from './payment';
import products from './products';
import shipping from './shipping';

export default combineReducers({
    auth,
    alert,
    categories,
    products,
    cart,
    shipping,
    payment,
});