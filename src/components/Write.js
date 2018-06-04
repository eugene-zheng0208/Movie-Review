import React, { Component } from 'react'
import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4'
import RaisedButton from 'material-ui/RaisedButton'

import * as ReadableAPI from '../utils/api'

import { addPost, editPost } from '../actions/Post'

class Write extends Component {
    state = {
        title: '',
        body: '',
        author: '',
        category: 'movie'
    }

    componentDidMount() {
        if (this.props.operation === 'edit') {
            // Populate the 'textarea' and 'input'
            ReadableAPI.getPostById(this.props.postId).then(({ title, body, category, author }) => {
                this.setState({ title, body, category, author })
            })
        }
    }

    render() {
        // Store
        const { addPost, editPost } = this.props

        // Parent
        const { operation, postId, history } = this.props

        // State
        const { title, body, author, category } = this.state

        return (
            <main className='write-section container'>
                <div>
                    Title:
                    <input
                        value={title}
                        onChange={event => this.setState({ title: event.target.value })}
                    />
                </div>
                <div>
                    Review:
                    <textarea
                        value={body}
                        onChange={event => this.setState({ body: event.target.value })}
                    />
                </div>
                <div>
                    <div className='submit'>
                        <RaisedButton
                            onClick={event => {
                                event.preventDefault()
                                if (title.trim() !== '' && body.trim() !== '' && author.trim() !== '') {
                                    if (operation === 'write') {
                                        const newId = uuidv4()
                                        addPost({ id: newId, timestamp: Date.now(), title, body, author, category })
                                        history.push(`/${category}/${newId}`)
                                    } else if (operation === 'edit') {
                                        editPost({ id: postId, timestamp: Date.now(), title, body, author, category })
                                        history.push(`/${category}/${postId}`)
                                    }
                                } else if (title.trim() === '') {
                                    window.alert('TITLE cannot be blank')
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
                    <div className='category'>
                        <span>Category: </span>
                        <select
                            value={category}
                            onChange={event => this.setState({ category: event.target.value })}
                        >
                            <option>movie</option>
                            <option>tv</option>
                        </select>
                    </div>
                </div>
            </main>
        );
    }
}

export default connect(
    null,
    { addPost, editPost }
)(Write)
