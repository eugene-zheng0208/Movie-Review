import * as ReadableAPI from '../utils/api'

/*
Categories
*/

// All
ReadableAPI.getCategories().then(categories => {
    console.log('getCategories\n', categories)
})

/*
Posts
*/

// By Category
ReadableAPI.getPostsByCategory('tv').then(posts => {
    console.log('getPostsByCategory\n', posts)
})

// All
ReadableAPI.getAllPosts().then(posts => {
    console.log('getAllPosts\n', posts)
})

// Add
ReadableAPI.addPost({
    id: 'ID',
    timestamp: 'TIMESTAMP',
    title: 'TITLE',
    body: 'BODY',
    author: 'AUTHOR',
    category: 'movie',
}).then(post => {
    console.log('addPost\n', post)
})

// By id
ReadableAPI.getPostById('8xf0y6ziyjabvozdd253nd').then(post => {
    console.log('getPostById\n', post)
})

// Vote
ReadableAPI.votePost({
    id: '8xf0y6ziyjabvozdd253nd',
    option: 'upVote',
}).then(post => {
    console.log('votePost\n', post)
})

// Edit
ReadableAPI.editPost({
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 'x',
    title: 'x',
    body: 'x',
    author: 'x',
    category: 'movie',
}).then(post => {
    console.log('editPost\n', post)
})

// Delete
ReadableAPI.deletePost('6ni6ok3ym7mf1p33lnez').then(post => {
    console.log('deletePost\n', post)
})

/*
Comments
*/

// By post
ReadableAPI.getCommentsByPost('8xf0y6ziyjabvozdd253nd').then(comments => {
    console.log('getCommentsByPost\n', comments)
})

// Add
ReadableAPI.addComment({
    id: 'ID2',
    parentId: 'ID',
    timestamp: 'TIMESTAMP2',
    body: 'BODY2',
    author: 'AUTHOR2',
}).then(comment => {
    console.log('addComment\n', comment)
})

// By id
ReadableAPI.getCommentById('894tuq4ut84ut8v4t8wun89g').then(comment => {
    console.log('getCommentById\n', comment)
})

// Vote
ReadableAPI.voteComment({
    id: '894tuq4ut84ut8v4t8wun89g',
    option: 'upVote',
}).then(comment => {
    console.log('voteComment\n', comment)
})

// Edit
ReadableAPI.editComment({
    id: '894tuq4ut84ut8v4t8wun89g',
    timestamp: 'x',
    body: 'x',
    author: 'x',
}).then(comment => {
    console.log('editComment\n', comment)
})

// Delete
ReadableAPI.deleteComment('8tu4bsun805n8un48ve89').then(comment => {
    console.log('deleteComment\n', comment)
})
