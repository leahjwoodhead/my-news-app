import React, { Component } from 'react';
import { fetchArticles } from './api';
import ArticleCard from './ArticleCard';
import { css } from "@emotion/core";
import PacmanLoader from 'react-spinners/PacmanLoader'
import styled from 'styled-components'

const SectionTitle = styled.h2`
    font-size: 3vw;
    color: #F95738;
`

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class Homepage extends Component {

    state = {
        popular: [],
        latest: [],
        loading: true,
    }

    componentDidMount () {
        fetchArticles().then(articles => {
            const latest = articles.slice(0, 4)
            fetchArticles(undefined, 4, "votes").then(popular => {
                this.setState({loading: false, latest, popular})
            })
        })
    }

  
    render() {
        const {loading, popular, latest} = this.state
        if (loading) {
            return (
                <PacmanLoader
                    css={override}
                    size={100}
                    color={"#F95738"}
                    loading={this.state.loading}
                />
            )   
        } else {
            return (
            <>
            <SectionTitle>POPULAR</SectionTitle>
                <ul className="Articles">
                    {popular.map(article => {
                        return (
                            <ArticleCard key={article.article_id} article={article}/>
                        )})} 
                </ul>  
                <SectionTitle>LATEST</SectionTitle>
                <ul className="Articles">
                    {latest.map(article => {
                        return (
                        <ArticleCard key={article.article_id} article={article}/>
                        )})}
                </ul> 
            </>
            )
        }  
    }
}

export default Homepage;