import React, { Component } from 'react';

class SortCommentsForm extends Component {

    render() {
        return (
            <select >
                <option>Latest</option>
                <option>Most Popular</option>
             </select>
        );
    }
}

export default SortCommentsForm;