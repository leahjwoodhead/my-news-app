import React, { Component } from 'react';
import styled from 'styled-components'
import {fetchArticles} from './api'
import ArticleCard from './ArticleCard'
import { css } from "@emotion/core";
import PacmanLoader from 'react-spinners/PacmanLoader'
import { Link } from '@reach/router'
import SortArticles from './SortArticles';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const TopicTitle = styled.h2`
    font-size: 3vw;
    color: #F95738;
`

const WriteArticleButton = styled.button`
    color: #F95738;
    margin: 5%;
    margin-top: 0;
    font-size: 50px;
    border: none;
    background-color: white;
`

const PageButton = styled.button`
    color: #F95738;
    font-size: 100px;
    border: none;
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
            <>
              {(topic ? <TopicTitle>{topic.toUpperCase()}</TopicTitle> : <TopicTitle>ALL ARTICLES</TopicTitle> )}  
              <SortArticles sortArticles={this.sortArticles}/>
              <ul className="Articles">
                    {articles.map(article => {
                        return (
                            <ArticleCard key={article.article_id} article={article}/>
                        )
                    })}
                </ul>
                {(p > 1) ? <PageButton id="previous" onClick={(event) => this.handleClick(event)}>⬅</PageButton> : null}
                {(p < pages) ? <PageButton id="next" onClick={(event) => this.handleClick(event)}>➡</PageButton> : null}<br></br>
                <p>Want to submit an article? Click <Link to="/submit"><WriteArticleButton>here</WriteArticleButton></Link> </p>
            </>
            );
        }
    }
}

export default Articles;

