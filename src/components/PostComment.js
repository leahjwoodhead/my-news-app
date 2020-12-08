import React, { Component } from 'react';
import styled from 'styled-components'

const CommentFormHolder = styled.form`
    border: 2px solid orange;
    border-radius: 10px;
    margin: 3vw 10vw;
    height: 100px;
    text-align: left;
`
class PostComment extends Component {

    state = {
        comment: {
            username: 'butter_bridge', 
            body: ''
        },
        value: ""
    }

    handleChange = (event) => {

    }

    render() {
        return (
            <CommentFormHolder>
                <form>
                    <label>Comment: </label><br/>
                    <input type="text" onChange={this.handleChange()} value={this.state.value} /><br/>
                    <input type="submit"/>
                </form>
            </CommentFormHolder>
        );
    }
}

export default PostComment;