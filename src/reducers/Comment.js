import * as ReadableAPI from '../utils/api'
import voteItems from '../utils/voteItems'

import { LOAD_COMMENT, ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT, VOTE_COMMENT } from '../actions/Comment'

export default function comments(state = {}, action) {
    const { comment, id, parentId, timestamp, body, author, option, upVote, downVote } = action

    switch (action.type) {
        case LOAD_COMMENT:
            return {
                ...state,
                [comment.id]: comment
            }
        case ADD_COMMENT:
            ReadableAPI.addComment({ id, parentId, timestamp, body, author })
            return {
                ...state,
                [id]: {
                    ...state[id],
                    id,
                    parentId,
                    timestamp,
                    body,
                    author,
                    voteScore: 1,
                    deleted: false,
                    parentDeleted: false
                }
            }
        case EDIT_COMMENT:
            ReadableAPI.editComment({ id, timestamp, body, author })
            return {
                ...state,
                [id]: {
                    ...state[id],
                    timestamp,
                    body,
                    author
                }
            }
        case DELETE_COMMENT:
            ReadableAPI.deleteComment(id)
            return {
                ...state,
                [id]: null
            }
        case VOTE_COMMENT:
            ReadableAPI.voteComment({ id, option })
            return voteItems(state, id, option, upVote, downVote)
        default:
            return state
    }
}
