import React, { Component } from 'react';
import styled from 'styled-components'
import { postComment } from './api'

const CommentFormHolder = styled.div`
    margin: 0 auto;
    width: 70%;
    height: 150px;
    text-align: left;
    padding-left: 10px;
    background-color: white;
    margin-top: 0;

    @media only screen and (max-width: 600px) {
        font-size: 10px;
        width: 95%;
        margin-right: 20px;
    }
`

const SubmitButton = styled.input`
    border: none;
    font-size: 20px;
    color: #F95738;
    background-color: white;
    width: 70%;
    text-align: left;

    &:hover {
        background-color: orange;
        color: black;
    }

    @media only screen and (max-width: 600px) {
        font-size: 10px;
        width: 95%;
    }
`

const CommentInput = styled.textarea`
    width: 99%;
    border: none;
    background-color: #EEEEEE;
    height: 100px;
    border: 1px solid lightgrey;
    margin-top: 10px;
`
class PostComment extends Component {

    state = {
        value: ""
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const {id} = this.props
        const comment = {
            username: 'cooljmessy',
            body: this.state.value
        }
        
        postComment(id, comment).then((comment => {
            this.props.addComment(comment)
            this.setState({value: ""})
        }))

    }

    handleChange = (event) => {
        this.setState({value: event.target.value})
    }

    render() {
        return (
            <CommentFormHolder>
                <form onSubmit={this.handleSubmit}>
                    <CommentInput placeholder="Write your comment here..."required type="text" onChange={(event) => this.handleChange(event)} value={this.state.value} /><br/>
                    <SubmitButton type="submit" value="Submit"/>
                </form>
            </CommentFormHolder>
        );
    }
}

export default PostComment;