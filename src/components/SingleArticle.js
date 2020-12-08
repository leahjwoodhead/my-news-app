import React, { Component } from 'react';
import { fetchArticleById } from './api'
import { css } from "@emotion/core";
import PacmanLoader from 'react-spinners/PacmanLoader'
import ErrorMessage from './ErrorMessage'
import styled from 'styled-components'
import Comments from './Comments'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const ArticleHolder = styled.div`
    border: 2px solid orange;
    border-radius: 10px;
    margin: 3vw 10vw;
    height: 40vw;
`

const ArticleTitle = styled.h1`
    font-size: 3vw;
    color: grey;
`


class SingleArticle extends Component {

    state = {
        article: {},
        loading: true,
        hasError: false,
        errorMessage: ''
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
    render() {
        const { article, loading, hasError, errorMessage } = this.state
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
        } else {
            return (
                <>
                <ArticleHolder>
                    <ArticleTitle>{article.title.toUpperCase()}</ArticleTitle>
                    <p>Topic: {article.topic}</p>
                    <p>{article.body}</p>
                    <p>By {article.author}</p>
                    <p>Votes: {article.votes}</p>
                </ArticleHolder>
                <Comments id={article_id}/>
                </>
            );
        }
    }
}

export default SingleArticle;