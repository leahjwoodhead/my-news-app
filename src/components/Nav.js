import React, { Component } from 'react';
import styled from 'styled-components'
import { Link } from '@reach/router'
import { fetchTopics } from './api'
import '../App.css'
import { NavBar } from '../styles'

export const NavButton = styled.button`
    font-size: 15px;
    border: none;
    height: 100%;
    background-color: #353A47;
    color: #F95738;
    padding-left: 20px;
    padding-right: 20px;

    &:hover {
        background-color: red;
        color: white;
    }

    @media only screen and (max-width: 600px) {
        font-size: 10px;
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
                    <Link to="/"><NavButton>ALL</NavButton></Link>
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