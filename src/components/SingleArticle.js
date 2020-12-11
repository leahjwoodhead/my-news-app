import React, { Component } from 'react';
import { fetchArticleById, deleteArticle } from './api'
import { css } from "@emotion/core";
import PacmanLoader from 'react-spinners/PacmanLoader'
import ErrorMessage from './ErrorMessage'
import styled from 'styled-components'
import Comments from './Comments'
import Voter from './Voter'
import { Link, navigate} from '@reach/router'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const ArticleHolder = styled.article`
    border: 2px solid orange;
    margin: 3vw 10vw;
    height: auto;
    background-color: white;
`

const ArticleTitle = styled.h1`
    font-size: 2vw;
    color: grey;
    
`
const ArticleBody = styled.p`
    width: 60%;
    padding: 50px;
    font-size: 20px;
    margin: auto;
    font-weight: lighter;
    font-family: 'Montserrat', sans-serif;;
`

const DeleteArticle = styled.button`
    border: none;
    font-size: 15px;
    color: orange;
    background-color: white;

    &:hover {
        background-color: orange;
        color: black;
    }
`

class SingleArticle extends Component {

    state = {
        article: {},
        loading: true,
        hasError: false,
        errorMessage: '',
        deleted: false
    }

    componentDidMount() {
        const { article_id } = this.props
        fetchArticleById(article_id).then(article => {
            this.setState({article, loading: false})
        }).catch((err) => {
            const { status, statusText } = err.response
            this.setState({hasError: true, loading: false, errorMessage: `ERROR - Status ${status}: ${statusText}`})
        })
    }

    deleteArticle = (id) => {
        const answer = window.confirm("Delete Article?")
        if (answer) {
            deleteArticle(id).then(() => {
                this.setState({  
                    article: {},
                    loading: false,
                    hasError: false,
                    errorMessage: '',
                    deleted: true})
            })
        }
    }

    navigateToHome = () => {
        setTimeout(() => {
            navigate('/')}, 2000)
    
    }

    render() {
        const { article, loading, hasError, errorMessage, deleted } = this.state
        const { article_id } = this.props

        if (loading) {
            return (
                <PacmanLoader
                  css={override}
                  size={100}
                  color={"#DF3B57"}
                  loading={this.state.loading}
                />
            )
        } else if (hasError) {
            return <ErrorMessage errorMessage={errorMessage}/>
        } else if (deleted) {
            return (
                <>
            <p>Article Has Been Deleted. Redirecting...</p>
            {this.navigateToHome()}
            </>
            )
        } else {
            return (
                <>
                <ArticleHolder>
                    <ArticleTitle>{article.title.toUpperCase()}</ArticleTitle>
                    <p>Topic: {article.topic}</p>
                    <ArticleBody>{article.body}</ArticleBody>
                    <p>By <Link to={`/users/${article.author}`}>{article.author}</Link></p>
                    <Voter votes={article.votes} id={article_id} type="article"/>
                    {(article.author === 'cooljmessy' ? <DeleteArticle onClick={() => this.deleteArticle(article.article_id)}>Delete Article</DeleteArticle> : <p></p>)}
                </ArticleHolder>
                <Comments id={article_id}/>
                </>
            );
        }
    }
}

export default SingleArticle;