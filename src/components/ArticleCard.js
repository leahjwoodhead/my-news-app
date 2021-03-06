import React, { Component } from 'react';
import styled from 'styled-components'
import {Link} from '@reach/router'
import { Article } from '../styles'
import cooking from '../assets/pexels-castorly-stock-3693293.jpg'
import coding from '../assets/pexels-negative-space-160107.jpg'
import football from '../assets/pexels-markus-spiske-114296.jpg'
import { fetchArticleById } from './api'


const ArticleTitle = styled.h2`
    margin: 10px auto;
    display: flex;
    align-items: center;
    width: 90%;
    color: black;
    font-size: 20px;
    &:hover {
        color: pink;
    }
`
const Author = styled.p`
    margin: 0 auto;
    width: 90%;
    display: flex;
    align-items: center;
`
const BottomCard = styled.div`
    margin: 0 auto;
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const Extract = styled.p`
    display: flex;
    align-items: center;
    width: 90%;
    font-size: 15px;
    height: auto;
    overflow: hidden;
    margin: 0 auto;
    margin-bottom: 5px;
`
const Overlay = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    width: 100%;
    opacity: 0;
    transition: .5s ease;
    background-color: #353A47;

  &:hover {
      opacity: 1;
  }
`

const OverlayText = styled.p`
    color: white;
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
`


class ArticleCard extends Component {

    state = {
        extract: ""
    }

    componentDidMount() {
        const { article } = this.props
        fetchArticleById(article.article_id).then(article => {
            const extract = article.body.split(" ").slice(0, 40).join(" ")
            this.setState({extract})
        })
    }
   
    render() {
        const { article, type } = this.props
        let image = "";
        if (article.topic === "cooking") image = cooking
        if (article.topic === "coding") image = coding
        if (article.topic === "football") image = football
        return (
            <Link to={`/article/${article.article_id}`} style={{ textDecoration: 'none' }}>
                <Article type={type}>

                    <div>
                        <img src={image} width="100%" height="300px" alt="article cover"/>
                        <Overlay>
                            <OverlayText>Topic: {article.topic.slice(0, 1).toUpperCase() + article.topic.slice(1)} </OverlayText>
                        </Overlay>
                    </div>
                    
                        <ArticleTitle>{article.title}</ArticleTitle>    
                  
                    <Extract>{this.state.extract}...</Extract>
                    <Author>Written by:  <Link to={`/users/${article.author}`}>{article.author}</Link></Author>
                    <BottomCard>
                        <p>🕗 {article.created_at.slice(0, 10)}</p>
                        <p>Votes: {article.votes}</p>
                    </BottomCard>
                    
                </Article>
                </Link>
        );
    }
}

export default ArticleCard;