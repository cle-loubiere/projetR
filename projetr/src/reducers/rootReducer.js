import { combineReducers } from 'redux';
import simpleReducer from './simpleReducer';
import menuReducer from './menuReducer';
import lessonReducer from './lessonReducer';
import videoReducer from './videoReducer'
import subtitleReducer from './subtileReducer'
import authReducer from './authReducer'

export default combineReducers({
    authReducer,
    lessonReducer,
    menuReducer,
    simpleReducer,
    videoReducer,
    subtitleReducer,
});