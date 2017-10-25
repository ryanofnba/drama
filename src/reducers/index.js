import { combineReducers } from 'redux';
import ShowReducer from './showReducer';
import ListReducer from './listReducer';
import SourceReducer from './sourceReducer';
import ShowsReducer from './showsReducer';
import EpisodesReducer from './episodesReducer';
import VideoReducer from './videoReducer';

export default combineReducers({
    selectedShow: ShowReducer,
    selectedList: ListReducer,
    sources: SourceReducer,
    shows: ShowsReducer,
    episodes: EpisodesReducer,
    videoLink: VideoReducer
});
