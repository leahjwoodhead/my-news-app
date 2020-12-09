import React, { Component } from 'react';
import { addVotesToArticle, addVotesToComment } from './api'

class Voter extends Component {

    state = {
        votes: 0,
    }


    addVote = (event) => {
        const { id, type } = this.props
        const inc = event.target.id
        if (type === "article") addVotesToArticle(id, inc)
        if (type === "comment") addVotesToComment(id, inc)
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
                <button id="up" onClick={this.addVote}>Yay</button>
                <button id="down" onClick={this.addVote}>Boo</button>
            </div>
        );
    }
}

export default Voter;