import React from 'react';
import styled from 'styled-components'

const SingleComment = styled.div`
    border-bottom: 1px dashed black;
    font-size: 10px;
    text-align: left;
    padding-left: 5px;
`

const CommentCard = (props) => {
    const {comment} = props
    return (
        <SingleComment>
            <p>{comment.body}<br/>{comment.author}
            </p>
        </SingleComment>
    );
};

export default CommentCard;

// {
//     "comment_id": 19,
//     "author": "butter_bridge",
//     "article_id": 2,
//     "votes": 0,
//     "created_at": "2015-05-22T14:56:29.000Z",
//     "body": "This was the worst thing I've ever read"
//     }