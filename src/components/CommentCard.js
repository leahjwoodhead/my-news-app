import styled from 'styled-components'
import React, { Component } from 'react';

const SingleComment = styled.div`
    border-bottom: 1px dashed black;
    font-size: 10px;
    text-align: left;
    padding-left: 5px;
`

const DeleteComment = styled.button`
    border: none;
    font-size: 0.5vw;
    color: orange;


    &:hover {
        background-color: orange;
        color: black;
    }
`

class CommentCard extends Component {

    state = {
        username: 'butter_bridge'
    }


    render() {
        const {comment} = this.props
        return (
            <SingleComment key={comment.comment_id}>
                <p>{comment.body}<br/>{comment.author}
                </p>
                <p>{comment.created_at}</p>
                <p>{comment.votes}</p>
                {(comment.author === 'butter_bridge' ? <DeleteComment onClick={() => this.props.deleteComment(comment.comment_id)}>Delete Comment</DeleteComment> : <p></p>)}
            </SingleComment>
        );
    }
}


export default CommentCard;

// {
//     "comment_id": 19,
//     "author": "butter_bridge",
//     "article_id": 2,
//     "votes": 0,
//     "created_at": "2015-05-22T14:56:29.000Z",
//     "body": "This was the worst thing I've ever read"
//     }