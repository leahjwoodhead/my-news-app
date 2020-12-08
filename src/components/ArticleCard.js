import React from 'react';
import styled from 'styled-components'
import {Link} from '@reach/router'

const Article = styled.li`
    border: 1px dashed;
    width: 40%;
    height: 200px;
    margin: 10px;
    color: #DF3B57;
    list-style: none;
`

const ArticleCard = (props) => {
    const { article } = props
    return (
        <Article>
            <h2>{article.title}</h2>
            <p>{article.topic}</p>
            <p>{article.created_at}</p>
            <Link to={`/article/${article.article_id}`}>Show Article</Link>
        </Article>
    );
};

export default ArticleCard;