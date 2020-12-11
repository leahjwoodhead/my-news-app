import React, { Component } from 'react';
import {fetchArticles, fetchUsers } from './api'
import ArticleCard from './ArticleCard'
import { css } from "@emotion/core";
import PacmanLoader from 'react-spinners/PacmanLoader'
import {navigate } from '@reach/router'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class ArticlesByUser extends Component {

    state = {
        username: "",
        articles: [],
        loading: true,
        total: 0,
        validUsers: []
    }

    redirect = () => {
        setTimeout(() => {
            navigate('/')}, 2000)
    }

    componentDidMount() {
        const { username } = this.props
        fetchArticles(undefined, 100).then((articles) => {
            const articlesByUser = articles.filter(article => article.author === username)
            const total = articlesByUser.length
            fetchUsers().then(users => {
                const validUsers = users.map(user => user.username)
                this.setState({articles: articlesByUser, loading: false, total, username, validUsers})
            })
        })
    }
    render() {
        const { loading, articles, username, total, validUsers } = this.state
        if (loading) {
            return (
                <PacmanLoader
                  css={override}
                  size={100}
                  color={"#DF3B57"}
                  loading={this.state.loading}
                />
            )
        } else if (!validUsers.includes(username)) {
            console.log(validUsers)
            return (
                <>
                <p>User Not Found. Redirecting...</p>
                {this.redirect()}
                </>
            )  
        } else {
            return (
                <div>
                    <h2>{username}'s Articles</h2>
                    <p>{total} articles found:</p>
                    <ul className="Articles">
                        {articles.map(article => {
                            return (
                                <ArticleCard key={article.article_id} article={article}/>
                            )
                        })}
                    </ul>
                </div>
            );
        } 
    }
}

export default ArticlesByUser;