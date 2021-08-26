import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import cart from './cart';
import categories from './categories';
import coupons from './coupons';
import orders from './orders';
import payment from './payment';
import products from './products';
import profile from './profile';
import reviews from './reviews';
import shipping from './shipping';
import wishlist from './wishlist';

export default combineReducers({
    auth,
    alert,
    categories,
    products,
    cart,
    shipping,
    payment,
    orders,
    coupons,
    profile,
    wishlist,
    reviews
});