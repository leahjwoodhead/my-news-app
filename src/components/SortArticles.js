import React, { Component } from 'react';

class SortArticles extends Component {

    // state = {
    //     value: 'Latest'
    // }

    handleChange = (event) => {
        this.props.sortArticles(event.target.value)
    }
    render() {
        return (
         
            <select onChange={(event) => this.handleChange(event)}>
                <option>Latest</option>
                <option>Oldest</option>
                <option>Most Popular</option>
                <option>Least Popular</option>
             </select>
        );
    }
}

export default SortArticles;