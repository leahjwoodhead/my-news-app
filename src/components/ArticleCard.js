import React from 'react';
import styled from 'styled-components'
import {Link} from '@reach/router'

const Article = styled.li`
    border-radius: 30px;
    border: 1px solid orange;
    width: 40%;
    height: 250px;
    margin: 10px;
    color: #DF3B57;
    list-style: none;
    background-color: white;
    text-align: left;
    padding-left: 30px;
`
const ArticleTitle = styled.h2`
    color: #DF3B57;
    /* width: 80%; */
    border-radius: 5px;

    &:hover {
        color: pink;
    }
`

const ArticleDate = styled.p`
    font-size: 10px;
    color: black;
`

const ArticleCard = (props) => {
    const { article } = props
    return (
        <Article>
            <Link to={`/article/${article.article_id}`} style={{ textDecoration: 'none' }}><ArticleTitle>{article.title}</ArticleTitle></Link>
            <p>📜{article.topic.slice(0, 1).toUpperCase() + article.topic.slice(1)}</p>
            <p>Written by {article.author}</p>
            <br></br>
            <ArticleDate>{article.created_at.slice(0, 10)}</ArticleDate><p>Votes: {article.votes}</p>
        </Article>
    );
};

export default ArticleCard;