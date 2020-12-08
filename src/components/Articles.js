import React, { Component } from 'react';
import styled from 'styled-components'
import {fetchArticles} from './api'
import ArticleCard from './ArticleCard'
import { css } from "@emotion/core";
import PacmanLoader from 'react-spinners/PacmanLoader'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


class Articles extends Component {
    state = {
        articles: [],
        loading: true
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.topic !== this.props.topic) {
            const { topic } = this.props
            this.setState({loading: true}, () => {
                fetchArticles(topic).then(articles => {
                    this.setState({articles, loading: false})
                })
            })
        }
    } 

    componentDidMount() {
        const { topic } = this.props
        fetchArticles(topic).then(articles => {
            this.setState({articles, loading: false})
        })
    }

    render() {
        if (this.state.loading) {
            return (
                <PacmanLoader
                  css={override}
                  size={100}
                  color={"#DF3B57"}
                  loading={this.state.loading}
                />
            )
        } else {
            return (
                <ul className="Articles">
                    {this.state.articles.map(article => {
                        return (
                            <ArticleCard key={article.article_id} article={article}/>
                        )
                    })}
                </ul> 
            )     
        }
    }
}

export default Articles;