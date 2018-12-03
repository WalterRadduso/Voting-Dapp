import React from 'react'

import "./Candidates.css";

class Candidates extends React.Component {
    render() {
        return (
            <div className="votesElection">
                {this.props.candidates.map((candidate) => {
                    return (
                        <div className="votes" key={candidate.id.toNumber()}>
                            <p>{candidate.name}</p>
                            <p>{candidate.voteCount.toNumber()}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Candidates
