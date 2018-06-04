import { combineReducers } from 'redux'

import posts from './Post'
import comments from './Comment'

export default combineReducers({
    posts,
    comments
})
