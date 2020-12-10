import React, { Component } from 'react';
import {addArticle} from './api'
import styled from 'styled-components'


class PostArticle extends Component {

    state = {
        titleInput: "",
        textInput: "",
        topic: "",
        username: "cooljmessy",
        posted: false
    }

    handleChange = (event) => {
        const value = event.target.value
        this.setState({ [event.target.id]: value})
    }

    // CANT ACCESS API!!

    handleSubmit = (event) => {
        event.preventDefault()
        const { titleInput, topic, textInput, username } = this.state
        addArticle(titleInput, topic, textInput, username).then(() => {
            this.setState({posted: true, 
            titleInput: "",
            textInput: "",
            topic: "",
            username: "cooljmessy" })
        })

    }
    render() {
        const { posted } = this.state
        if (posted) {
            return (
                <p>Successful!</p>
            )
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <p>Title</p>
                    <input id="titleInput" value={this.state.titleInput} onChange={(event) => this.handleChange(event)}/>
                    <p>Topic</p>
                    <select id="topic" onChange={(event) => this.handleChange(event)}>
                        <option>cooking</option>
                        <option>coding</option>
                        <option>football</option>
                    </select>
                    <p>Write your article here:</p>
                    <input id="textInput" value={this.state.textInput} onChange={(event) => this.handleChange(event)}/>
                    <input type="submit" value="post"/>
                </form>
            );
        }
    }
}

export default PostArticle;