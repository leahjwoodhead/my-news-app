import React, { Component } from 'react';
import styled from 'styled-components'
import { Link } from '@reach/router'
import { fetchTopics } from './api'

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
                    <Link to="/">Home</Link>
                    {this.state.topics.map(topic => {
                        return (
                            <Link to={`/articles/${topic.slug}`}>{topic.slug}</Link>
                        )})}
                </nav>
            ) 
        }
    }
}

export default Nav;