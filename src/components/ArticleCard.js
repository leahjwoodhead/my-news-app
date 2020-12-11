import React from 'react';
import styled from 'styled-components'
import {Link} from '@reach/router'

const Article = styled.li`
    width: 40%;
    height: 250px;
    font-size: 20px;
    margin: 10px;
    color: #F95738;
    list-style: none;
    background-color: white;
    text-align: left;
    padding-left: 30px;
`
const ArticleTitle = styled.h2`
    color: #F95738;
    &:hover {
        color: pink;
    }
`

const ArticleDate = styled.p`
    font-size: 15px;
    color: black;
`

const ArticleCard = (props) => {
    const { article, type } = props
    return (
        <Article type={type}>
            <Link to={`/article/${article.article_id}`} style={{ textDecoration: 'none' }}><ArticleTitle>{article.title}</ArticleTitle></Link>
            <p>📜{article.topic.slice(0, 1).toUpperCase() + article.topic.slice(1)} <br/>Written by {article.author}</p>
            <ArticleDate>🕗 {article.created_at.slice(0, 10)}</ArticleDate>
            <p>Votes: {article.votes}</p>
        </Article>
    );
};

export default ArticleCard;