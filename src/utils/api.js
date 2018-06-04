const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:5001'

let token = localStorage.token

if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
    'Accept': 'application/json',
    'Authorization': token
}

/*
Categories
*/

// All
export const getCategories = () =>
    fetch(`${api}/categories`, { headers })
        .then(res => res.json())
        .then(data => data.categories)

/*
Posts
*/

// By Category
export const getPostsByCategory = (category) =>
    fetch(`${api}/${category}/posts`, { headers })
        .then(res => res.json())

// All
export const getAllPosts = () =>
    fetch(`${api}/posts`, { headers })
        .then(res => res.json())

// Add
export const addPost = (body) =>
    fetch(`${api}/posts`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => res.json())

// By id
export const getPostById = (id) =>
    fetch(`${api}/posts/${id}`, { headers })
        .then(res => res.json())

// Vote
export const votePost = (body) =>
    fetch(`${api}/posts/${body.id}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => res.json())

// Edit
export const editPost = (body) =>
    fetch(`${api}/posts/${body.id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => res.json())

// Delete
export const deletePost = (id) =>
    fetch(`${api}/posts/${id}`, { method: 'DELETE', headers })
        .then(res => res.json())

/*
Comments
*/

// By post
export const getCommentsByPost = (id) =>
    fetch(`${api}/posts/${id}/comments`, { headers })
        .then(res => res.json())

// Add
export const addComment = (body) =>
    fetch(`${api}/comments`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => res.json())

// By id
export const getCommentById = (id) =>
    fetch(`${api}/comments/${id}`, { headers })
        .then(res => res.json())

// Vote
export const voteComment = (body) =>
    fetch(`${api}/comments/${body.id}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => res.json())

// Edit
export const editComment = (body) =>
    fetch(`${api}/comments/${body.id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => res.json())

// Delete
export const deleteComment = (id) =>
    fetch(`${api}/comments/${id}`, { method: 'DELETE', headers })
        .then(res => res.json())
