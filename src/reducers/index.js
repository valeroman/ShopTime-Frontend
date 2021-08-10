import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import categories from './categories';
import products from './products';

export default combineReducers({
    auth,
    alert,
    categories,
    products
});