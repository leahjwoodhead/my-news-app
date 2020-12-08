import React, { Component } from 'react';
import styled from 'styled-components'
import { fetchCommentsById, deleteCommentById } from './api'
import CommentCard from './CommentCard'
import PostComment from './PostComment';


const CommentsHolder = styled.div`
    border: 2px solid orange;
    border-radius: 10px;
    margin: 3vw 10vw;
    height: auto;
    background-color: white;

`

class Comments extends Component {

    state = {
        comments: [],
        displayedComments: [],
        showAll: false
    }

    componentDidMount() {
        const { id } = this.props
        fetchCommentsById(id).then(comments => {
            let display = []
            if (comments.length > 0) {
                display = [comments[0]]
            }
            this.setState({comments, displayedComments: display
            })
        })
    }

    addComment = (comment) => {
        this.setState(currState => {
            let display = [comment]
            const newState = {comments: [comment, ...currState.comments], displayedComments: display}
            return newState
        })
    }

    deleteComment = (id) => {
        deleteCommentById(id).then(() => {
            this.setState(currState => {
                const filteredComments = currState.comments.filter(comment => comment.comment_id !== id)
                let display = []
                if (filteredComments.length > 0) {
                display = [filteredComments[0]]
            }   
                const newState = { comments: filteredComments, displayedComments: display}
                return newState
            })
        })
    }

    changeCommentDisplay = () => {
        this.setState(currState => {
            const newState = {showAll: !currState.showAll}
            return newState
        })
    }

    render() {
        const { id } = this.props
        const { comments, showAll, displayedComments } = this.state

        if (showAll) {
            return   ( 
            <>
             <button onClick={this.changeCommentDisplay}>Hide Comments</button> <p>Showing: {comments.length} of {comments.length}</p> 
            <CommentsHolder>
                {comments.map(comment => {
                    return <CommentCard comment={comment} deleteComment={this.deleteComment}/>
                })}
            </CommentsHolder>
            <PostComment id={id} addComment={this.addComment} />
            </>
            )
        } else {
            return (
            <>
            <button onClick={this.changeCommentDisplay}>Show All Comments</button> <p>Showing: {displayedComments.length} of {comments.length}</p>
            <CommentsHolder>
                {displayedComments.map(comment => {
                    return <CommentCard comment={comment} deleteComment={this.deleteComment}/>
                })}
            </CommentsHolder>
            <PostComment id={id} addComment={this.addComment} />
            </>
            );
        }
    }
}

export default Comments;