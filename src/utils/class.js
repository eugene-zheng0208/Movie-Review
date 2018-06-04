import classNames from 'classnames'

export const page = (page) => classNames({
    'post': page === 'list',
    'post-detail': page === 'detail',
    'flex-box': true,
})

export const upVote = (upVote) => classNames({
    'up-svg': !upVote,
    'up-svg-green': upVote,
    'vote-svg': true,
    'svg': true
})

export const downVote = (downVote) => classNames({
    'down-svg': !downVote,
    'down-svg-red': downVote,
    'vote-svg': true,
    'svg': true
})
