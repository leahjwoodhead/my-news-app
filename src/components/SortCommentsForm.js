import React, { Component } from 'react';

class SortCommentsForm extends Component {

    // state = {
    //     value: 'Latest'
    // }

    handleChange = (event) => {
        // this.setState({value: event.target.value})
        this.props.updateDisplay(event.target.value)
    }
    render() {
        return (
         
            <select  onChange={(event) => this.handleChange(event)}>
                <option>Latest</option>
                <option>Older</option>
                <option>Most Popular</option>
                <option>Least Popular</option>
                <option>All</option>
             </select>
        );
    }
}

export default SortCommentsForm;