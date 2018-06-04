import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import dateFormat from 'dateformat'

import Vote from './Vote'
import * as Class from '../utils/class'

import { deletePost } from '../actions/Post'

class Post extends Component {
    trim = (str) => {
        return str.length > 300
            ? str.slice(0, 300) + '...'
            : str
    }

    render() {
        // Store
        const comments = this.props.comments.filter(comment => comment !== null)
        const { deletePost } = this.props

        // Parent
        const { page, history } = this.props
        const { author, body, category, id, timestamp, title, voteScore, upVote, downVote } = this.props.post

        return (
            <div className={Class.page(page)}>
                <Vote
                    section='post'
                    voteScore={voteScore}
                    id={id}
                    upVote={upVote}
                    downVote={downVote}
                />
                <div className='text'>

                    {page === 'list' &&
                    <div>
                        <Link
                            to={`/${category}/${id}`}
                        >{title}</Link>
                    </div>}

                    {page === 'detail' &&
                    <div>{title}</div>}

                    <div>{`${author}, ${dateFormat(timestamp, 'mmm dd yyyy HH:MM:ss')}, ${category}`}</div>

                    {page === 'list' &&
                    <div>{`${this.trim(body)} (${comments.filter(comment => comment.parentId === id).length} comments)`}</div>}

                    {page === 'detail' &&
                    <div className='html-space'>{body}</div>}

                    <div>
                        <div className='options'>
                            <a
                                href='javascript:;'
                                onClick={() => {
                                    deletePost({ id })
                                    if (page === 'detail') {
                                        history.push('/')
                                    }
                                }}
                            >delete</a>
                        </div>
                        <div className='options'>
                            <Link
                                to={`/${id}`}
                            >edit</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ comments }) {
    return {
        comments: Object.keys(comments).reduce((result, id) => {
            result.push(comments[id])
            return result
        }, [])
    }
}

export default connect(
    mapStateToProps,
    { deletePost }
)(Post)
