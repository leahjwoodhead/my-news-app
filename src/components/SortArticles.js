import React, { Component } from 'react';
import styled from 'styled-components'

const SortDiv = styled.div`
    display: flex;
`

const SortOption = styled.p`
    font-size: 20px;
    color: #F95738;
    font-weight: 500;
    padding: 10px;
    transition: transform .2s;

    &:hover {
        transform: scale(1.1);
    }

    @media only screen and (max-width: 600px) {
        font-size: 10px;
    }
`

class SortArticles extends Component {

    handleChange = (event) => {
        this.props.sortArticles(event.target.id)
    }
    render() {
        return (
            <SortDiv>
                <SortOption id="Latest" onClick={(event) => this.handleChange(event)}>Latest</SortOption>
                <SortOption id="Oldest" onClick={(event) => this.handleChange(event)}>Oldest</SortOption>
                <SortOption id="Most Popular" onClick={(event) => this.handleChange(event)}>Most Popular</SortOption>
                <SortOption id="Least Popular" onClick={(event) => this.handleChange(event)}>Least Popular</SortOption>
            </SortDiv>
        );
    }
}

export default SortArticles;