import React from 'react';
import styled from 'styled-components'
import {Link} from '@reach/router'

const Article = styled.div`
    border: 1px dashed;
    width: 40%;
    height: 200px;
    margin: 10px;
    color: #DF3B57;
`

const ArticleCard = (props) => {
    const { article } = props
    return (
        <Article>
            <h1>{article.title}</h1>
            <p>{article.topic}</p>
            <p>{article.created_at}</p>
            <Link to={`/article/${article.article_id}`}>Show Article</Link>
        </Article>
    );
};

export default ArticleCard;