import React, { Component } from 'react';
import {addArticle} from './api'
import styled from 'styled-components'
import { navigate} from '@reach/router'

const ArticleInput = styled.textarea`
    width: 80%;
    height: 300px;
    
`
const ArticleSubmit = styled.input`
    font-size: 20px;
    margin: 20px;
    width: 80%;
    text-align: left;
    color: #DF3B57;
    background-color: white;
    border: none;
    &:hover {
        background-color: #DF3B57;
        color: white;
    }
`

const ArticleInfo = styled.div`
    margin: 50px auto;
    width: 80%;
    display: flex;
    flex-direction: column;
    text-align: left;
    justify-content: space-evenly;
    color: #DF3B57;
    
`

const FormContainer = styled.form`
    border: 1px solid #BFBFBF;
    box-shadow: 5px 10px 5px #aaaaaa;
    width: 80%;
    margin: 50px auto;
`

const Labels = styled.p`
    
`
const TitleInput = styled.input`
    border: none;
    border-bottom: 1px solid grey;
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
                <FormContainer onSubmit={this.handleSubmit}>
                    <ArticleInfo>
                        <Labels>Title: </Labels>
                        <TitleInput required id="titleInput" value={this.state.titleInput} onChange={(event) => this.handleChange(event)}/>
                        <Labels>Topic: </Labels>
                        <select required id="topic" onChange={(event) => this.handleChange(event)}>
                            <option value="" disabled selected>Select Topic</option>
                            <option>cooking</option>
                            <option>coding</option>
                            <option>football</option>
                        </select>
                    </ArticleInfo>
                    <ArticleInput required id="textInput" placeholder="Write your article here..."value={this.state.textInput} onChange={(event) => this.handleChange(event)}/><br/>
                    <ArticleSubmit type="submit" value="Submit"/>
                </FormContainer>
            );
        }
    }
}

export default PostArticle;