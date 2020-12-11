import styled from 'styled-components'
import React, { Component } from 'react';
import Voter from './Voter'

const SingleComment = styled.div`
    border: 1px solid orange;
    font-size: 15px;
    text-align: left;
    padding-left: 5px;
`

const CommentBody = styled.p`
    font-size: 20px;
`

const DeleteComment = styled.button`
    border: none;
    font-size: 15px;
    color: orange;
    background-color: white;

    &:hover {
        background-color: orange;
        color: black;
    }
`

class CommentCard extends Component {

    state = {
        username: 'cooljmessy'
    }


    render() {
        const {comment} = this.props
        return (
            <SingleComment key={comment.comment_id}>
                <CommentBody>{comment.body}</CommentBody>
                <p>{comment.author} @ {comment.created_at.slice(11, 16)} {comment.created_at.slice(0, 10)} </p>
                <Voter id={comment.comment_id} votes={comment.votes} type="comments"/>
                {(comment.author === 'cooljmessy' ? <DeleteComment onClick={() => this.props.deleteComment(comment.comment_id)}>Delete Comment</DeleteComment> : <p></p>)}
            </SingleComment>
        );
    }
}


export default CommentCard;

