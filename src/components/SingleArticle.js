import React, { Component } from 'react';
import { fetchArticleById } from './api'

class SingleArticle extends Component {

    state = {
        article: []
    }

    componentDidMount() {
        const { article_id } = this.props
        fetchArticleById(article_id).then(article => {
            this.setState({article})
        })
    }
    render() {
        return (
            <div>
                <h1>{this.state.article.title}</h1>
            </div>
        );
    }
}

export default SingleArticle;