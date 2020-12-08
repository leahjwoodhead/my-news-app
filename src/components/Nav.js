import React, { Component } from 'react';
import styled from 'styled-components'
import { Link } from '@reach/router'
import { fetchTopics } from './api'

const NavButton = styled.button`
    border: none;
    font-size: 2vw;
    width: 100%;
    color: #DF3B57;
    height: 150px;
    &:hover {
        background-color: pink;
        color:white;

    }
`

class Nav extends Component {
    state = {
        topics: [],
        loading: true
    }
    componentDidMount() {
        fetchTopics().then((topics) => {
            this.setState({ topics, loading: false})
        })
    }

    render() {
        if (this.state.loading) {
            return (
                <>
                </>
            )
        } else {
            return (
                <nav>
                    <Link to="/"><NavButton>HOME</NavButton></Link>
                    {this.state.topics.map(topic => {
                        return (
                            <Link to={`/articles/${topic.slug}`} key={topic.slug}><NavButton slug={topic.slug
                            }>{topic.slug.toUpperCase()}</NavButton></Link>
                        )})}
                </nav>
            ) 
        }
    }
}

export default Nav;