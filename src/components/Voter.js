import React, { Component } from 'react';
import { addVotesToArticle, addVotesToComment } from './api'
import styled from 'styled-components'

const VoteButton = styled.button`
    border: none;
    background-color: white;
    transition: transform .2s;
    margin: 5px;

    &:hover {
        transform: scale(2); 
        background-color: orange;
    }
`

class Voter extends Component {

    state = {
        votes: 0,
    }


    addVote = (event) => {
        const { id, type } = this.props
        const inc = event.target.id
        if (type === "article") addVotesToArticle(id, inc)
        if (type === "comments") addVotesToComment(id, inc)
        this.setState(currState => {    
            let newState = {...currState}
            if (inc === "up") { 
                newState.votes++
            } else {
                newState.votes--
            }
            return newState
        })
    
    }

    render() {
        return (
            <div>
                <p>Votes: {this.props.votes + this.state.votes}</p>
                <VoteButton id="up" onClick={this.addVote}>💯</VoteButton>
                <VoteButton id="down" onClick={this.addVote}>🤢</VoteButton>
            </div>
        );
    }
}

export default Voter;