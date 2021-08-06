import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import categories from './categories';

export default combineReducers({
    auth,
    alert,
    categories
});