import * as ReadableAPI from '../utils/api'
import voteItems from '../utils/voteItems'

import { LOAD_POST, ADD_POST, EDIT_POST, DELETE_POST, VOTE_POST } from '../actions/Post'

export default function posts(state = {}, action) {
    const { post, id, timestamp, title, body, author, category, option, upVote, downVote } = action

    switch (action.type) {
        case LOAD_POST:
            return {
                ...state,
                [post.id]: post
            }
        case ADD_POST:
            ReadableAPI.addPost({ id, timestamp, title, body, author, category })
            return {
                ...state,
                [id]: {
                    ...state[id],
                    id,
                    timestamp,
                    title,
                    body,
                    author,
                    category,
                    voteScore: 1,
                    deleted: false,
                    upVote: false,
                    downVote: false
                }
            }
        case EDIT_POST:
            ReadableAPI.editPost({ id, timestamp, title, body, author, category })
            return {
                ...state,
                [id]: {
                    ...state[id],
                    timestamp,
                    title,
                    body,
                    author,
                    category
                }
            }
        case DELETE_POST:
            ReadableAPI.deletePost(id)
            return {
                ...state,
                [id]: null
            }
        case VOTE_POST:
            ReadableAPI.votePost({ id, option })
            return voteItems(state, id, option, upVote, downVote)
        default:
            return state
    }
}
