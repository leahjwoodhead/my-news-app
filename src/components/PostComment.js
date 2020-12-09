import React, { Component } from 'react';
import styled from 'styled-components'
import { postComment } from './api'

const CommentFormHolder = styled.div`
    border: 2px solid orange;
    border-radius: 10px;
    margin: 3vw 10vw;
    height: 100px;
    text-align: left;
    background-color: white;
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
                    <label>Comment: </label><br/>
                    <input type="text" onChange={(event) => this.handleChange(event)} value={this.state.value} /><br/>
                    <input type="submit" value="Submit"/>
                </form>
            </CommentFormHolder>
        );
    }
}

export default PostComment;