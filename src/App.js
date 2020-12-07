import './App.css';
import styled from 'styled-components'
import Header from './components/Header';
import Navigation from './components/Nav'
import Articles from './components/Articles'
import SingleArticle from './components/SingleArticle'
import { Router } from '@reach/router'

const PageContainer = styled.div`
  height: auto;
`

function App() {
  return (
    <PageContainer className="App">
      <Header/>
      <Navigation/>
      <Router>
        <Articles path="/"/>
        <Articles path="/articles/:topic"/>
        <SingleArticle path="/article/:article_id"/>
      </Router>
    </PageContainer>
  );
}

export default App;
