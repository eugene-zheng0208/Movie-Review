import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as Class from '../utils/class'

import { votePost } from '../actions/Post'
import { voteComment } from '../actions/Comment'

class Vote extends Component {
    render() {
        // Store
        const { votePost, voteComment } = this.props

        // Parent
        const { section, voteScore, id, upVote, downVote } = this.props

        return (
            <div className='vote'>
                <div>
                    <a
                        className={Class.upVote(upVote)}
                        href='javascript:;'
                        onClick={() => {
                            if (section === 'post') {
                                votePost({ id, option: 'upVote', upVote, downVote })
                            } else if (section === 'comment') {
                                voteComment({ id, option: 'upVote', upVote, downVote })
                            }
                        }}
                    >Up</a>
                </div>
                <div>{voteScore}</div>
                <div>
                    <a
                        className={Class.downVote(downVote)}
                        href='javascript:;'
                        onClick={() => {
                            if (section === 'post') {
                                votePost({ id, option: 'downVote', upVote, downVote })
                            } else if (section === 'comment') {
                                voteComment({ id, option: 'downVote', upVote, downVote })
                            }
                        }}
                    >Do</a>
                </div>
            </div>
        )
    }
}

export default connect(
    null,
    { votePost, voteComment }
)(Vote)