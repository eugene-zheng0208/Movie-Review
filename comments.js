const clone = require('clone')

let db = {}

const defaultData = {
  "894tuq4ut84ut8v4t8wun89g": {
    id: '894tuq4ut84ut8v4t8wun89g',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1468166872634,
    body: 'Dunkirk is, in my opinion, yet another masterpiece from mastermind Christopher Nolan. Since everything that is brilliant about the film has already been said I will briefly write what I think of the film and also touch on a topic that some people are criticizing the movie for.',
    author: 'nimdude',
    voteScore: 6,
    deleted: false,
    parentDeleted: false,
    upVote: false,
    downVote: false
  },
  "8tu4bsun805n8un48ve89": {
    id: '8tu4bsun805n8un48ve89',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1469479767190,
    body: 'It\'s hard to understand critic ratings of 10/10 while this movie undeniably lacks quality on some very important aspects.',
    author: 'Martin010',
    voteScore: -5,
    deleted: false,
    parentDeleted: false,
    upVote: false,
    downVote: false
  }
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

// By post
function getByParent (token, parentId) {
  return new Promise((res) => {
    let comments = getData(token)
    let keys = Object.keys(comments)
    filtered_keys = keys.filter(key => comments[key].parentId === parentId && !comments[key].deleted)
    res(filtered_keys.map(key => comments[key]))
  })
}

// Add
function add (token, comment) {
  return new Promise((res) => {
    let comments = getData(token)

    comments[comment.id] = {
      id: comment.id,
      timestamp: comment.timestamp,
      body: comment.body,
      author: comment.author,
      parentId: comment.parentId,
      voteScore: 1,
      deleted: false,
      parentDeleted: false,
      upVote: false,
      downVote: false
    }
     
    res(comments[comment.id])
  })
}

// By id
function get (token, id) {
    return new Promise((res) => {
        const comments = getData(token)
        res(
            comments[id].deleted || comments[id].parentDeleted
                ? {}
                : comments[id]
        )
    })
}

// Vote
function vote (token, id, option) {
  return new Promise((res) => {
      let comments = getData(token)
      comment = comments[id]
      const { upVote, downVote, voteScore } = comment
      switch(option) {
          case "upVote":
              if (!upVote && !downVote) {
                  comment.voteScore = voteScore + 1
                  comment.upVote = true
              } else if (upVote) {
                  comment.voteScore = voteScore - 1
                  comment.upVote = false
              } else if (downVote) {
                  comment.voteScore = voteScore + 2
                  comment.upVote = true
                  comment.downVote = false
              }
              break
          case "downVote":
              if (!downVote && !upVote) {
                  comment.voteScore = voteScore - 1
                  comment.downVote = true
              } else if (downVote) {
                  comment.voteScore = voteScore + 1
                  comment.downVote = false
              } else if (upVote) {
                  comment.voteScore = voteScore - 2
                  comment.downVote = true
                  comment.upVote = false
              }
              break
          default:
              console.log(`comments.vote received incorrect parameter: ${option}`)
      }
      res(comment)
  })
}

// Edit
function edit (token, id, comment) {
    return new Promise((res) => {
        let comments = getData(token)
        for (prop in comment) {
            comments[id][prop] = comment[prop]
        }
        res(comments[id])
    })
}

// Delete
function disable (token, id) {
    return new Promise((res) => {
        let comments = getData(token)
        comments[id].deleted = true
        res(comments[id])
    })
}

/*
Posts
*/

// Delete
function disableByParent (token, post) {
    return new Promise((res) => {
        let comments = getData(token)
        keys = Object.keys(comments)
        filtered_keys = keys.filter(key => comments[key].parentId === post.id)
        filtered_keys.forEach(key => comments[key].parentDeleted = true)
        res(post)
    })
}

module.exports = {
  get,
  getByParent,
  add,
  vote,
  disableByParent,
  disable,
  edit
}