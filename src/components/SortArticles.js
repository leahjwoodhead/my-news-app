import React, { Component } from 'react';
import styled from 'styled-components'

const SortBar = styled.select`
    font-size: 30px;
    border: none;
    background-color: white;
    color: #F95738;
    width: 300px;
    padding-left: 10px;
`

class SortArticles extends Component {

    // state = {
    //     value: 'Latest'
    // }

    handleChange = (event) => {
        this.props.sortArticles(event.target.value)
    }
    render() {
        return (
            <SortBar onChange={(event) => this.handleChange(event)}>
                <option>Latest</option>
                <option>Oldest</option>
                <option>Most Popular</option>
                <option>Least Popular</option>
             </SortBar>
        );
    }
}

export default SortArticles;