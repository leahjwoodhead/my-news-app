import React, { Component } from 'react';
import styled from 'styled-components'
import { fetchCommentsById } from './api'
import CommentCard from './CommentCard'
import PostComment from './PostComment';

const CommentsHolder = styled.div`
    border: 2px solid orange;
    border-radius: 10px;
    margin: 3vw 10vw;
    height: auto;

`

class Comments extends Component {

    state = {
        comments: []
    }

    componentDidMount() {
        const { id } = this.props
        fetchCommentsById(id).then(comments => {
            this.setState({comments})
        })
    }

    addComment = (comment) => {
        this.setState(currState => {
            const newState = {comments: [comment, ...currState.comments]}
            return newState
        })
    }

    render() {
        const { id } = this.props
        const { comments } = this.state
        return (
            <>
            <CommentsHolder>
                {comments.map(comment => {
                    return <CommentCard comment={comment}/>
                })}
            </CommentsHolder>
            <PostComment id={id} addComment={this.addComment}/>
            </>
        );
    }
}

export default Comments;