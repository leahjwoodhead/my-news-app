import React, { Component } from 'react';
import styled from 'styled-components'
import {fetchArticles} from './api'
import ArticleCard from './ArticleCard'
import { css } from "@emotion/core";
import PacmanLoader from 'react-spinners/PacmanLoader'
import { Link } from '@reach/router'
import SortArticles from './SortArticles';
import { ArticlesContainer, ArticleList } from '../styles.js'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const TopicTitle = styled.h2`
    font-size: 40px;
    color: #F95738;
    margin-right: 20px;

    @media only screen and (max-width: 600px) {
        font-size: 20px;
    }
`

const WriteArticleButton = styled.button`
    color: #F95738;
    font-size: 20px;
    border: none;
`

const PageButtonLeft = styled.button`
    color: #F95738;
    font-size: 20px;
    background-color: white;
    border: none;
`
const PageButtonRight = styled.button`
    color: #F95738;
    font-size: 20px;
    border: none;
    background-color: white;
`

const ArticlesTop = styled.div`
    grid-area: top;
    display: flex;
    align-items: baseline;
    width: 58%;
    margin: 0 auto;

    @media only screen and (max-width: 600px) {
        width: 90%;
    }
`

const ArticlesBottom = styled.div`
    grid-area: bottom;
    display: flex;
    width: 58%;
    margin: 0 auto;
    align-items: center;
    justify-content: space-between;
`
class Articles extends Component {

    state = {
        articles: [],
        p: 1,
        loading: true,
        limit: 10,
        sort_by: "created_at",
        order: "desc",
        pages: 1
    }

    sortArticles = (sort) => {
        let {sort_by, order} = this.state
        if (sort === "Latest") {
            sort_by = "created_at"
            order = "desc"
        } 
        if (sort === "Oldest") {
            sort_by = "created_at"
            order = "asc"
        }
        if (sort === "Most Popular") {
            sort_by = "votes"
            order = "desc"
        }
        if (sort === "Least Popular") {
            sort_by = "votes"
            order = "asc"
        }
        this.setState({sort_by, order})
    }

    handleClick = (event) => {
        this.setState(currState => {
            const newState = {...currState}
            if (event.target.id === "next") newState.p++
            if (event.target.id === "previous") newState.p--
            return newState
        })
    }

    componentDidUpdate = (prevProps, prevState) => {
        const { topic } = this.props
        const { limit, sort_by, order, p } = this.state
        if (prevState.p !== p || prevProps.topic !== topic || prevState.sort_by !== sort_by || prevState.order !== order) {
            this.setState(currState => {
                const newState = {loading: true, ...currState}
                if (prevProps.topic !== this.props.topic) {
                    newState.p = 1
                    newState.sort_by = "created_at"
                    newState.order = "desc"
                } 
                return newState
            })
            fetchArticles(topic, limit, sort_by, order, p).then((articles) => {
                fetchArticles(topic, 100).then(res => {
                    const pages = Math.ceil(res.length / 10)
                    this.setState({articles, loading: false, pages})
                }) 
            })
        }
    }

    componentDidMount() {
        const { topic } = this.props
        const { limit, sort_by, order, p } = this.state
        fetchArticles(topic, limit, sort_by, order, p).then((articles) => {
            fetchArticles(topic, 100).then(res => {
                const pages = Math.ceil(res.length / 10)
                console.log(pages)
                this.setState({articles, loading: false, pages})
            }) 
        })
    }

    render() {
        if (this.state.loading) {
            return (
                <PacmanLoader
                    css={override}
                    size={100}
                    color={"#F95738"}
                    loading={this.state.loading}
                />
            )
        } else {
            const {topic} = this.props
            const {articles, pages, p} = this.state
            return (
            <ArticlesContainer>
                <ArticlesTop>
                    {(topic ? <TopicTitle>{topic.toUpperCase()}</TopicTitle> : <TopicTitle>ALL ARTICLES</TopicTitle> )}  
                    <SortArticles sortArticles={this.sortArticles}/>
                </ArticlesTop>
              <ArticleList>
                    {articles.map(article => {
                        return (
                            <ArticleCard key={article.article_id} article={article}/>
                        )
                    })}
                </ArticleList>
                <ArticlesBottom>
                    <div>
                        {(p < pages) ? <PageButtonRight id="next" onClick={(event) => this.handleClick(event)}>Next</PageButtonRight> : null}
                        {(p > 1) ? <PageButtonLeft id="previous" onClick={(event) => this.handleClick(event)}>Previous</PageButtonLeft> : null}
                    </div>
                    <p>Want to submit an article? Click <Link to="/submit"><WriteArticleButton>here</WriteArticleButton></Link> </p>
                </ArticlesBottom>
            </ArticlesContainer>
            );
        }
    }
}

export default Articles;

