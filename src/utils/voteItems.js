export default function voteItems(state, id, option, upVote, downVote) {
    if (option === 'upVote') {
        if (!upVote && !downVote) {
            return {
                ...state,
                [id]: {
                    ...state[id],
                    voteScore: state[id].voteScore + 1,
                    upVote: true
                }
            }
        } else if (upVote) {
            return {
                ...state,
                [id]: {
                    ...state[id],
                    voteScore: state[id].voteScore - 1,
                    upVote: false
                }
            }
        } else if (downVote) {
            return {
                ...state,
                [id]: {
                    ...state[id],
                    voteScore: state[id].voteScore + 2,
                    upVote: true,
                    downVote: false
                }
            }
        } else {
            return state
        }
    } else if (option === 'downVote') {
        if (!downVote && !upVote) {
            return {
                ...state,
                [id]: {
                    ...state[id],
                    voteScore: state[id].voteScore - 1,
                    downVote: true
                }
            }
        } else if (downVote) {
            return {
                ...state,
                [id]: {
                    ...state[id],
                    voteScore: state[id].voteScore + 1,
                    downVote: false
                }
            }
        } else if (upVote) {
            return {
                ...state,
                [id]: {
                    ...state[id],
                    voteScore: state[id].voteScore - 2,
                    downVote: true,
                    upVote: false
                }
            }
        } else {
            return state
        }
    } else {
        return state
    }
}
