import { combineReducers } from 'redux';
import ShowReducer from './showReducer';
import ListReducer from './listReducer';
import SourceReducer from './sourceReducer';
import VideoReducer from './videoReducer';

export default combineReducers({
    selectedShow: ShowReducer,
    selectedList: ListReducer,
    sources: SourceReducer,
    videoLink: VideoReducer
});
