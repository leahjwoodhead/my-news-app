import React, { Component } from 'react';
import styled from 'styled-components'
import { fetchCommentsById, deleteCommentById } from './api'
import CommentCard from './CommentCard'
import PostComment from './PostComment';
import SortCommentsForm from './SortCommentsForm'


const CommentsHolder = styled.div`
    border: 2px solid orange;
    margin: 3vw 10vw;
    height: ${props => {
        if (props.expand) return 'auto' 
        else if (props.length < 4) return 'auto'
        else return '20vw'}};
    background-color: white;
    overflow-y: scroll;
    margin-bottom: 0;

`

class Comments extends Component {

    state = {
        comments: [],
        length: 0,
        displaying: 'Latest',
        expand: false
    }

    componentDidUpdate(prevProps, prevState) {
        const { id } = this.props
        const {displaying} = this.state
        if (prevState.displaying !== this.state.displaying) {
           let sort_by = "created_at"
           let limit = 100
           let order = "asc"
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

    expandComments = (event) => {
        const {id} = event.target
        if (id === "expand") this.setState({expand: true})
        else if (id === "hide") this.setState({expand: false})
        
    }

    componentDidMount() {
        const { id } = this.props
        fetchCommentsById(id, 100, "created_at").then(comments => {
            this.setState({comments, length: comments.length})
        })
    }

    updateDisplay = (value) => {
        this.setState({displaying: value})
    }

    addComment = (comment) => {
        this.setState(currState => {
            const newState = {comments: [comment, ...currState.comments], length: currState.comments.length + 1}
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
        const { comments, expand, length } = this.state
            return   ( 
            <>
                <SortCommentsForm updateDisplay={this.updateDisplay}/>
                {(expand ? <button id="hide" onClick={(event) => this.expandComments(event)}>Hide</button> :  <button id="expand" onClick={(event) => this.expandComments(event)}>Expand</button>)}
                <CommentsHolder expand={expand} length={length}>
                    {(length > 0 ? comments.map(comment => {
                        return <CommentCard comment={comment} deleteComment={this.deleteComment}/>
                    }) : <p>This article does not have any comments</p>)}
                </CommentsHolder>
                <PostComment id={id} addComment={this.addComment} />
            </>
            )
        
    }
}

export default Comments;