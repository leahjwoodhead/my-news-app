import React, { Component } from 'react';
import styled from 'styled-components'
import { fetchCommentsById, deleteCommentById } from './api'
import CommentCard from './CommentCard'
import PostComment from './PostComment';
import SortCommentsForm from './SortCommentsForm'


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
        displaying: 'Latest'
    }

    componentDidUpdate(prevProps, prevState) {
        const { id } = this.props
        const {displaying} = this.state
        if (prevState.displaying !== this.state.displaying) {
           let sort_by = "created_at"
           let limit = 4
           let order = "asc"
           if (displaying === 'All') limit = 100
           if (displaying === 'Latest') order = "desc"
           if (displaying === 'Oldest') order = "asc"
           if (displaying === 'Most Popular') {
               sort_by = "votes"
               order = "desc"
           }
           if (displaying === 'Least Popular') sort_by = "votes"
    
           fetchCommentsById(id, limit, sort_by, order).then(comments => {
            this.setState({comments})
        })
        }
    }

    componentDidMount() {
        const { id } = this.props
        fetchCommentsById(id, 4, "created_at").then(comments => {
            this.setState({comments})
        })
    }

    updateDisplay = (value) => {
        this.setState({displaying: value})
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

    render() {
        const { id } = this.props
        const { comments } = this.state
            return   ( 
            <>
                <SortCommentsForm updateDisplay={this.updateDisplay}/>
                <CommentsHolder>
                    {comments.map(comment => {
                        return <CommentCard comment={comment} deleteComment={this.deleteComment}/>
                    })}
                </CommentsHolder>
                <PostComment id={id} addComment={this.addComment} />
            </>
            )
        
    }
}

export default Comments;