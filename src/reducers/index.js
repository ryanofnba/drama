import { combineReducers } from 'redux';
import ShowReducer from './showReducer';

export default combineReducers({
    selectedShow: ShowReducer
});
