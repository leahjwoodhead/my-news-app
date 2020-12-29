import React, { Component } from 'react';
import { SortDiv, SortOption } from './SortArticles'

class SortCommentsForm extends Component {

    handleChange = (event) => {
        this.props.updateDisplay(event.target.value)
    }
    render() {
        return (
            <SortDiv>
<               SortOption id="Latest" onClick={(event) => this.handleChange(event)}>Latest</SortOption>
                <SortOption id="Oldest" onClick={(event) => this.handleChange(event)}>Oldest</SortOption>
                <SortOption id="Most Popular" onClick={(event) => this.handleChange(event)}>Most Popular</SortOption>
                <SortOption id="Least Popular" onClick={(event) => this.handleChange(event)}>Least Popular</SortOption>
            </SortDiv>
            
        );
    }
}

export default SortCommentsForm;