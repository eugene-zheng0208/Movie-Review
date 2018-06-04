import React, { Component } from 'react'
import dateFormat from 'dateformat'

import Vote from './Vote'

class Comment extends Component {
    render() {
        // Parent
        const { id, timestamp, body, author, voteScore, upVote, downVote } = this.props.comment
        const { onEditButton, onDeleteButton } = this.props

        return (
            <div className='comment-old-detail flex-box'>
                <Vote
                    section='comment'
                    voteScore={voteScore}
                    id={id}
                    upVote={upVote}
                    downVote={downVote}
                />
                <div className='text'>
                    <div className='html-space'>{body}</div>
                    <div>{`${author}, ${dateFormat(timestamp, 'mmm dd yyyy HH:MM:ss')}`}</div>
                    <div>
                        <div className='options'>
                            <a
                                href='javascript:;'
                                onClick={() => {
                                    onDeleteButton(id)
                                }}
                            >delete</a>
                        </div>
                        <div className='options'>
                            <a
                                href='#editComment'
                                onClick={() => {
                                    onEditButton(id)
                                }}
                            >edit</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Comment
