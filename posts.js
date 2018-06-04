const clone = require('clone')

let db = {}

const defaultData = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'A technical masterpiece that is nearly devoid of palpable emotion and compelling characters.',
    body: 'Might as well get right to it, then. At the risk of sounding like a contrarian, I did not love this film. Do I love elements of this? Yes. Is this a 5-star masterpiece? Unfortunately, no. \n' +
    '\n' +
    'The cinematography here at least, is masterful. Director Christopher Nolan has, without a doubt, reached the pinnacle of on-screen spectacle here. The feats of practical effects in this film are breathtaking. The casting of nearly 6,000 extras, authentic WWII vehicles, and shooting on location in Dunkirk, France contribute to a great sense of scale here. There is ongoing trend of action films in recent years of relying on CGI, and thankfully Nolan bucks that trend. \n' +
    '\n' +
    'Similar to War for the Planet of the Apes, much of the film plays out without much dialogue, leaning on just the score and sound design in most scenes. It almost goes without saying that Hans Zimmer delivers with another incredible score. The sound design is also extremely well crafted, which, paired with Nolan\'s great work behind the camera, truly transports you to the Battle of Dunkirk. The wailing of planes passing above, the drone of gunfire, and the roar of explosions all contribute to the complete immersion into the world these characters are trapped in. This results in some of the most immersive wartime action scenes since Saving Private Ryan.',
    author: 'Cameron Clay (criticadelcinema)',
    category: 'movie',
    voteScore: 6,
    deleted: false,
    upVote: false,
    downVote: false
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'One of the most stunning shows on television',
    body: 'Do not believe any of those negative reviews. I honestly cannot understand why some reviewers have given this such a low rating. I think some people love the sound of their own voice and think their opinion is worth something and will be disagreeable simply for the sake of it.\n' +
    '\n' +
    'Having said that, this show is stunning. I have never read the books and now I want to. There is so much crap on TV that is renewed year after year (CSI, House etc.) which uses cheap gags, pointless and sometimes ridiculous plots, unbelievable and many times one dimensional characters and yet all the truly great shows get cancelled.\n' +
    '\n' +
    'There is enough brain-dead television. But once in a while a show comes along that transports you to another world and makes you believe in the magic of television again. Game of Thrones is one such show.',
    author: 'paulday98',
    category: 'tv',
    voteScore: -5,
    deleted: false,
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

// By Category
function getByCategory (token, category) {
  return new Promise((res) => {
    let posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => posts[key].category === category && !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

// All
function getAll (token) {
  return new Promise((res) => {
    const posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

// Add
function add (token, post) {
  return new Promise((res) => {
    let posts = getData(token)
    
    posts[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      voteScore: 1,
      deleted: false,
      upVote: false,
      downVote: false
    }
     
    res(posts[post.id])
  })
}

// By id
function get (token, id) {
    return new Promise((res) => {
        const posts = getData(token)
        res(
            posts[id].deleted
                ? {}
                : posts[id]
        )
    })
}

// Vote
function vote (token, id, option) {
  return new Promise((res) => {
    let posts = getData(token)
    post = posts[id]
    const { upVote, downVote, voteScore } = post
    switch(option) {
        case "upVote":
            if (!upVote && !downVote) {
                post.voteScore = voteScore + 1
                post.upVote = true
            } else if (upVote) {
                post.voteScore = voteScore - 1
                post.upVote = false
            } else if (downVote) {
                post.voteScore = voteScore + 2
                post.upVote = true
                post.downVote = false
            }
            break
        case "downVote":
            if (!downVote && !upVote) {
                post.voteScore = voteScore - 1
                post.downVote = true
            } else if (downVote) {
                post.voteScore = voteScore + 1
                post.downVote = false
            } else if (upVote) {
                post.voteScore = voteScore - 2
                post.downVote = true
                post.upVote = false
            }
            break
        default:
            console.log(`posts.vote received incorrect parameter: ${option}`)
    }
    res(post)
  })
}

// Edit
function edit (token, id, post) {
    return new Promise((res) => {
        let posts = getData(token)
        for (prop in post) {
            posts[id][prop] = post[prop]
        }
        res(posts[id])
    })
}

// Delete
function disable (token, id) {
    return new Promise((res) => {
      let posts = getData(token)
      posts[id].deleted = true
        console.log(posts[id])
        res(posts[id])
    })
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit
}