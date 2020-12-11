import React, { Component } from 'react';
import styled from 'styled-components'
import { Link } from '@reach/router'
import { fetchTopics } from './api'

const NavBar = styled.nav`
    background-color: orange;
    color: pink;
    font-size: 1vw;
    width: 100%;
    position: fixed;
    display: flex;
    justify-content: center;
`

export const NavButton = styled.button`
    border: none;
    height: 50px;
    background-color: orange;
    color: #F95738;
    padding-left: 20px;
    padding-right: 20px;

    @media screen and (max-width: 600px) {
        font-size: 5px;
    }
    &:hover {
        background-color: #F95738;
        color:white;
    }
`

class Nav extends Component {
    state = {
        topics: [],
        loading: true,
    }
    componentDidMount() {
        fetchTopics().then((topics) => {
            this.setState({ topics, loading: false})
        })
    }

    render() {
        if (this.state.loading) {
            return (
                <nav>
                    <p>Loading</p>
                </nav>
            )
        } else {
            return (
                <NavBar>                  
                    <Link to="/"><NavButton>HOME</NavButton></Link>
                    <Link to="/articles"><NavButton>ALL</NavButton></Link>
                    {this.state.topics.map(topic => {
                        return (
                            <Link to={`/articles/${topic.slug}`} key={topic.slug}><NavButton slug={topic.slug
                            }>{topic.slug.toUpperCase()}</NavButton></Link>
                        )})}
                </NavBar>
            ) 
        }
    }
}

export default Nav;