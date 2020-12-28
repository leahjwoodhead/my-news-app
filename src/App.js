import './App.css';
import styled from 'styled-components'
import Header from './components/Header';
import Navigation from './components/Nav'
import Articles from './components/Articles'
import SingleArticle from './components/SingleArticle'
import { Router } from '@reach/router'
import ErrorMessage from './components/ErrorMessage';
import Footer from './components/Footer'
import PostArticle from './components/PostArticle'
import Homepage from './components/Homepage';
import ArticlesByUser from './components/ArticlesByUser';
import { PageContainer } from './styles.js'

// const User = styled.p`
//   text-align: right;
//   padding-right: 5px;
//   color: #F95738;
// `

function App() {
  return (
    <PageContainer>
      {/* <User>Logged in as cooljmessy</User> */}
      <Navigation/>
      <Header/>
      <Router>
        <Homepage path="/"/>
        <Articles path="/articles"/>
        <Articles path="/articles/:topic"/>
        <ArticlesByUser path="/users/:username"/>
        <SingleArticle path="/article/:article_id"/>
        <PostArticle path="/submit"/>
        <ErrorMessage default errorMessage="Page Not Found"/>
      </Router>
      <Footer/>
    </PageContainer>
  );
}

export default App;
