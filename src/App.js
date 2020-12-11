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

const PageContainer = styled.div`
  height: auto;
`

function App() {
  return (
    <PageContainer className="App">
      <Header/>
      <Navigation/>
      <Router>
        <Homepage path="/"/>
        <Articles path="/articles"/>
        <Articles path="/articles/:topic"/>
        <SingleArticle path="/article/:article_id"/>
        <PostArticle path="/submit"/>
        <ErrorMessage default errorMessage="Page Not Found"/>
      </Router>
      <Footer/>
    </PageContainer>
  );
}

export default App;
