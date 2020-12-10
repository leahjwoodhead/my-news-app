import React, { Component } from 'react';
import styled from 'styled-components'
import {fetchArticles} from './api'
import ArticleCard from './ArticleCard'
import { css } from "@emotion/core";
import PacmanLoader from 'react-spinners/PacmanLoader'
import {Link} from '@reach/router'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const TopicTitle = styled.h2`
    font-size: 3vw;
    color: orange;
`

const SectionTitle = styled.h3`
    color: pink;
    font-size: 2vw;
    text-transform: uppercase;
    color: #DF3B57;
`
const ScrollUl = styled.div`
    /* background-color: lightgrey; */
    width: 100%;
    overflow-y: auto;
    height: 40vw;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    border: 1px inset orange;
    border-radius: 20px;
    
`
const WriteArticleButton = styled.button`
    color: #DF3B57;
    margin: 4%;
    font-size: 2vw;
`


class Articles extends Component {
    state = {
        articles: [],
        loading: true,
        popular: [],
        latest: []
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.topic !== this.props.topic) {
            const { topic } = this.props
            this.setState({loading: true}, () => {
                fetchArticles(topic, 100).then(articles => {
                    fetchArticles(topic, 4, "votes").then((popular) => {
                        const latest = articles.slice(0, 4)
                        this.setState({articles, loading: false, latest, popular})
                    })
                })
            })
        }
    } 

    componentDidMount() {
        const { topic } = this.props
        fetchArticles(topic, 100).then(articles => {
            fetchArticles(topic, 4, "votes").then((popular) => {
                const latest = articles.slice(0, 4)
                this.setState({articles, loading: false, latest, popular})
            })
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
            const { topic } = this.props
            console.log(this.state)
            return (
                <>
                {(topic ? <TopicTitle>{topic.slice(0, 1).toUpperCase() + topic.slice(1)}</TopicTitle> : <TopicTitle>All Articles</TopicTitle> )}
                <SectionTitle>Popular</SectionTitle>
                <ul className="Articles">
                    {this.state.popular.map(article => {
                        return (
                            <ArticleCard key={article.article_id} article={article}/>
                        )
                    })}
                    </ul>
                <SectionTitle>Latest</SectionTitle>
                <ul className="Articles">
                    {this.state.latest.map(article => {
                        return (
                            <ArticleCard key={article.article_id} article={article}/>
                        )
                    })}
                    </ul>
                <SectionTitle>All</SectionTitle>
                <ul className="Articles">
                    <ScrollUl>
                    {this.state.articles.map(article => {
                        return (
                            <ArticleCard key={article.article_id} article={article}/>
                        )
                    })}
                    </ScrollUl>
                </ul> 
                <Link to="/submit"><WriteArticleButton>Write Article</WriteArticleButton></Link>
                </>
            )     
        }
    }
}

export default Articles;