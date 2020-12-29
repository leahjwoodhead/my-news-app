import React, { Component } from 'react';
import styled from 'styled-components'
import { fetchCommentsById, deleteCommentById } from './api'
import CommentCard from './CommentCard'
import PostComment from './PostComment';
import SortCommentsForm from './SortCommentsForm'


const CommentsHolder = styled.div`
    margin: 0 auto;
    width: 70%;
    height: ${props => {
        if (props.expand) return 'auto' 
        else if (props.length < 4) return 'auto'
        else return '20vw'}};
    background-color: white;
    overflow-y: scroll;
    margin-bottom: 0;
    
    @media only screen and (max-width: 600px) {
        width: 95%;
        height: 300px;
    }

`

const CommentsTop = styled.div`
    display: flex;
    width: 80%;
    margin: 0 auto;
    align-items: baseline;

    @media only screen and (max-width: 600px) {
        width: 100%;
        flex-direction: column;
    }
`

const CommentsTitle = styled.h2`
        font-size: 30px;
        color: #F95738;
        margin-right: 20px;

    @media only screen and (max-width: 600px) {
        font-size: 20px;
        margin-left: 10px;
    }
`

const ExpandButton = styled.button`
    border: none;
    background-color: white;
    color: #F95738;
    width: 70%;
    text-align: left;
    font-size: 20px;
    margin: 10px;

    @media only screen and (max-width: 600px) {
        font-size: 10px;
        width: 95%;
    }
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
                <CommentsTop>
                    <CommentsTitle>{length} Comments</CommentsTitle>
                    <SortCommentsForm updateDisplay={this.updateDisplay}/>
                </CommentsTop>
                <CommentsHolder expand={expand} length={length}>
                    {(length > 0 ? comments.map(comment => {
                        return <CommentCard comment={comment} deleteComment={this.deleteComment}/>
                    }) : <p>This article does not have any comments</p>)}
                </CommentsHolder>
                {(expand ? <ExpandButton id="hide" onClick={(event) => this.expandComments(event)}>Hide</ExpandButton> :  <ExpandButton id="expand" onClick={(event) => this.expandComments(event)}>Expand</ExpandButton>)}
                <PostComment id={id} addComment={this.addComment} />
            </>
            )
        
    }
}

export default Comments;