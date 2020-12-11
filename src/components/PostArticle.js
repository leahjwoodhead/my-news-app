import React, { Component } from 'react';
import {addArticle} from './api'
import styled from 'styled-components'
import {Link, navigate} from '@reach/router'

const ArticleInput = styled.textarea`
    width: 60%;
    height: 20vw;
    border-radius: 10px;
`
const ArticleSubmit = styled.input`
    border: none;
    font-size: 1vw;
    margin: 20px;
    border: 1px solid;
    color: #DF3B57;
    margin-bottom: 5vw;
    &:hover {
        background-color: #DF3B57;
        color: white;
    }
`

const ArticleInfo = styled.div`
    width: 60%;
    display: flex;
    justify-content: center;
    margin-top: 40px;
    margin-bottom: 40px;
    color: #DF3B57;
`

class PostArticle extends Component {

    state = {
        titleInput: "",
        textInput: "",
        topic: "",
        username: "cooljmessy",
        posted: false,
        article_id: 0
    }

    handleChange = (event) => {
        const value = event.target.value
        this.setState({ [event.target.id]: value})
    }


    handleSubmit = (event) => {
        event.preventDefault()
        const { titleInput, topic, textInput, username } = this.state
        addArticle(titleInput, topic, textInput, username).then((article) => {
            const {article_id} = article
            this.setState({posted: true, 
            titleInput: "",
            textInput: "",
            topic: "",
            username: "cooljmessy",
            article_id
        })
        })

    }

    navToArticle = (id) => {
        setTimeout(() => {
            navigate(`/article/${id}`);}, 2000)
        
    }

    render() {
        const { posted, article_id } = this.state
        if (posted) {
            return (
                <>
                <p>Successful! Redirecting....</p>
                {this.navToArticle(article_id)}
                </>
            )
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <ArticleInfo>
                        <p>Title: </p>
                        <input required id="titleInput" value={this.state.titleInput} onChange={(event) => this.handleChange(event)}/>
                        <p>Topic: </p>
                        <select required id="topic" onChange={(event) => this.handleChange(event)}>
                            <option value="" disabled selected>Select Topic</option>
                            <option>cooking</option>
                            <option>coding</option>
                            <option>football</option>
                        </select>
                    </ArticleInfo>
                    <ArticleInput required id="textInput" placeholder="Write your article here..."value={this.state.textInput} onChange={(event) => this.handleChange(event)}/><br/>
                    <ArticleSubmit type="submit" value="Submit"/>
                </form>
            );
        }
    }
}

export default PostArticle;