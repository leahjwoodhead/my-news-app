import styled from 'styled-components'

// Grid Areas

export const PageContainer = styled.div`
    height: auto;
    text-align: center;
    font-family: 'Jura', sans-serif;
    display: grid;
    grid-template-rows: 300px 50px auto 50px;
    grid-template-columns: 100%;
    grid-template-areas: 
    'header'
    'nav'
    'page'
    'footer';
    width: 100%;

    @media only screen and (max-width: 600px) {
    grid-template-rows: 150px 30px auto 30px;
    }
`

export const ArticlesContainer = styled.div`
    grid-area: page;
`
export const Title = styled.header`
    font-size: 50px;
    color: white;
    background-color: #353A47;
    display: flex;
    justify-content: center;
    align-items: center;
    grid-area: header;

    @media only screen and (max-width: 600px) {
        font-size: 30px;
    }
`
export const NavBar = styled.nav`
    background-color: #353A47;
    width: 100%;
    display: flex;
    justify-content: center;
    grid-area: nav;
`
export const AppFooter = styled.footer`
    background-color: #353A47;
    width: 100%;
    grid-area: footer;
    position: fixed;
    bottom: 0;
    text-align: left;
    color: #F95738;
    padding-left: 10px;
`

// Article styles

export const ArticleList = styled.ul`
    margin: 0 auto;
    width: 60%;
    grid-area: page;
    display: grid;
    grid-template-columns: 50% 50%;
    padding: 0;
    
    @media only screen and (max-width: 600px) {
        width: 95%;
        grid-template-columns: 100%;
    }
`

export const Article = styled.li`
    margin: 50px;
    width: 95%;
    height: 600px;
    font-size: 15px;
    margin-bottom: 10px;
    color: black;
    list-style: none;
    background-color: white;
    border: 1px solid #BFBFBF;
    box-shadow: 5px 10px 5px #aaaaaa;
    text-align: left;
    transition: transform .2s;
    position: relative;

    @media only screen and (max-width: 600px) {
        width: 100%;
        height: auto;
        margin: 10px auto;
    }

    &:hover {
        transform: scale(1.1);
    }

    display: grid;
    grid-template-rows: 300px 100px 150px 20px 30px;
`