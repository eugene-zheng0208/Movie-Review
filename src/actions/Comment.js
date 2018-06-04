export const LOAD_COMMENT = 'LOAD_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'

export function loadComment({ comment }) {
    return {
        type: LOAD_COMMENT,
        comment
    }
}

export function addComment({ id, parentId, timestamp, body, author }) {
    return {
        type: ADD_COMMENT,
        id,
        parentId,
        timestamp,
        body,
        author
    }
}

export function editComment({ id, timestamp, body, author }) {
    return {
        type: EDIT_COMMENT,
        id,
        timestamp,
        body,
        author
    }
}

export function deleteComment({ id }) {
    return {
        type: DELETE_COMMENT,
        id
    }
}

export function voteComment({ id, option, upVote, downVote }) {
    return {
        type: VOTE_COMMENT,
        id,
        option,
        upVote,
        downVote
    }
}
