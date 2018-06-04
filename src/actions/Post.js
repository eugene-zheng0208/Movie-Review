export const LOAD_POST = 'LOAD_POST'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const VOTE_POST = 'VOTE_POST'

export function loadPost({ post }) {
    return {
        type: LOAD_POST,
        post
    }
}

export function addPost({ id, timestamp, title, body, author, category }) {
    return {
        type: ADD_POST,
        id,
        timestamp,
        title,
        body,
        author,
        category
    }
}

export function editPost({ id, timestamp, title, body, author, category }) {
    return {
        type: EDIT_POST,
        id,
        timestamp,
        title,
        body,
        author,
        category
    }
}

export function deletePost({ id }) {
    return {
        type: DELETE_POST,
        id
    }
}

export function votePost({ id, option, upVote, downVote }) {
    return {
        type: VOTE_POST,
        id,
        option,
        upVote,
        downVote
    }
}
