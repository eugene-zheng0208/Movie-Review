import React, { Component } from 'react'
import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4'
import RaisedButton from 'material-ui/RaisedButton'

import * as ReadableAPI from '../utils/api'
import sortItems from '../utils/sort'
import Comment from './Comment'

import { addComment, editComment, deleteComment } from '../actions/Comment'

class CommentSection extends Component {
    state = {
        sort: 'vote',
        body: '',
        author: '',
        edit: false,
        editId: ''
    }

    render() {
        // Store
        const comments = this.props.comments.filter(comment => comment !== null)
        const { addComment, editComment, deleteComment } = this.props

        // Parent
        const { postId } = this.props

        // State
        const { sort, body, author, edit, editId } = this.state

        sortItems(sort, comments)

        return (
            <div className='comment-section'>
                <div className='comment-num'>{`${comments.filter(comment => comment.parentId === postId).length} Comments`}</div>
                <div className='comment-sort'>
                    <span>sorted by: </span>
                    <select
                        value={sort}
                        onChange={event => this.setState({ sort: event.target.value })}
                    >
                        <option>vote</option>
                        <option>time</option>
                    </select>
                </div>
                <div className='comment-new'>
                    <div>
                        <textarea
                            id='editComment'
                            value={body}
                            onChange={event => this.setState({ body: event.target.value })}
                            placeholder="Post a Comment"
                        />
                    </div>
                    <div>
                        <div className='submit'>
                            <RaisedButton
                                onClick={event => {
                                    event.preventDefault()
                                    if (body.trim() !== '' && author.trim() !== '') {
                                        if (edit) {
                                            editComment({ id: editId, timestamp: Date.now(), body, author })
                                            this.setState({ body: '', author: '', edit: false, editId: '' })
                                        } else {
                                            addComment({ id: uuidv4(), parentId: postId, timestamp: Date.now(), body, author })
                                            this.setState({ body: '', author: '' })
                                        }
                                    } else if (body.trim() === '') {
                                        window.alert('BODY cannot be blank')
                                    } else if (author.trim() === '') {
                                        window.alert('AUTHOR cannot be blank')
                                    }
                                }}
                            >Submit</RaisedButton>
                        </div>
                        <div className='author'>
                            <span>Author: </span>
                            <input
                                value={author}
                                onChange={event => this.setState({ author: event.target.value })}
                            />
                        </div>
                    </div>
                </div>
                <div className='comment-old'>
                    {comments.filter(comment => comment.parentId === postId).map(comment => (
                        <Comment
                            key={comment.id}
                            commentId={comment.id}
                            comment={comment}
                            onEditButton={id => {
                                ReadableAPI.getCommentById(id).then(comment => {
                                    // Populate the 'textarea' and 'input'
                                    this.setState({ body: comment.body, author: comment.author, edit: true, editId: id })
                                })
                            }}
                            onDeleteButton={id => {
                                deleteComment({ id })

                                // If the original comment is deleted before the edited version is submitted, count this comment as a new one
                                this.setState({ edit: false })
                            }}
                        />
                    ))}
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
    { addComment, editComment, deleteComment }
)(CommentSection)
