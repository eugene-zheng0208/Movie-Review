import React, { Component } from 'react'
import { Route, Link, withRouter, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as ReadableAPI from '../utils/api'
import sortItems from '../utils/sort'
import Post from './Post'
import CommentSection from './CommentSection'
import Write from './Write'

import { loadPost } from '../actions/Post'
import { loadComment } from '../actions/Comment'

class App extends Component {
    state = {
        paths: ['/', '/movie', '/tv'],
        sort: 'vote',
        seconds: 3
    }

    componentDidMount() {
        ReadableAPI.getAllPosts()
            // Load posts
            .then(posts => posts.map(post => {
                this.props.loadPost({ post })
                ReadableAPI.getCommentsByPost(post.id)
                    // Load its correspond comments
                    .then(comments => comments.map(comment => this.props.loadComment({ comment })))
            }))

        const self = this

        this.interval = setInterval(function () {
            self.setState({
                seconds: self.state.seconds - 1
            })
        }, 1000)
    }

    componentWillMount() {
        clearInterval(this.interval)
    }

    render() {
        // Store
        const posts = this.props.posts.filter(post => post !== null)

        // State
        const { paths, sort, seconds } = this.state

        sortItems(sort, posts)

        return (
            <div>
                <header className='flex-box'>
                    <div className='home'>
                        <Link
                            className='home-svg header-svg svg'
                            to='/'
                        >Ho</Link>
                    </div>
                    <div className='category'>
                        <Link
                            to='/movie'
                        >Movie</Link>
                    </div>
                    <div className='category'>
                        <Link
                            to='/tv'
                        >TV</Link>
                    </div>
                    <div className='write'>
                        <Link
                            className='write-svg header-svg svg'
                            to='/write'
                        >Wr</Link>
                    </div>
                </header>

                <Switch>

                    {/*Main page*/}

                    {paths.map(path => (
                        <Route
                            exact path={path}
                            key={path}
                            render={({ history }) => (
                                <main>
                                    <div className='post-sort'>
                                        <span>Sorted by: </span>
                                        <select
                                            value={sort}
                                            onChange={event => this.setState({ sort: event.target.value })}
                                        >
                                            <option>vote</option>
                                            <option>time</option>
                                        </select>
                                    </div>
                                    <div className='container'>
                                        {posts.filter(post => (path === '/') || (post.category === path.slice(1))).map(post => (
                                            <Post
                                                key={post.id}
                                                page='list'
                                                post={post}
                                                history={history}
                                            />
                                        ))}
                                    </div>
                                </main>
                            )}
                        />
                    ))}

                    {/*Post page*/}

                    {posts.map(post => (
                        <Route
                            path={`/${post.category}/${post.id}`}
                            key={post.id}
                            render={({ history }) => (
                                <main>
                                    <div className='container'>
                                        <Post
                                            page='detail'
                                            post={post}
                                            history={history}
                                        />
                                        <MuiThemeProvider>
                                            <CommentSection
                                                postId={post.id}
                                            />
                                        </MuiThemeProvider>
                                    </div>
                                </main>
                            )}
                        />
                    ))}

                    {/*Write page*/}

                    <Route
                        path="/write"
                        render={({ history }) => (
                            <MuiThemeProvider>
                                <Write
                                    operation='write'
                                    history={history}
                                />
                            </MuiThemeProvider>
                       )}
                    />

                    {posts.map(post => (
                        <Route
                            path={`/${post.id}`}
                            key={post.id}
                            render={({ history }) => (
                                <MuiThemeProvider>
                                    <Write
                                        operation='edit'
                                        postId={post.id}
                                        history={history}
                                    />
                                </MuiThemeProvider>
                            )}
                        />
                    ))}

                    <Route render={({ history }) => {
                        setTimeout(function () {
                            history.push('/')
                        }, 3000)

                        return (
                            <div className='not-found'>
                                <h3>404 Not Found</h3>
                                <div>Return HOME in {seconds} seconds</div>
                            </div>
                        )
                    }}/>

                </Switch>
            </div>
        );
    }
}

function mapStateToProps({ posts }) {
    return {
        posts: Object.keys(posts).reduce((result, id) => {
            result.push(posts[id])
            return result
        }, [])
    }
}

export default withRouter(connect(
    mapStateToProps,
    { loadPost, loadComment }
)(App))
