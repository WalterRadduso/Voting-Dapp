import React from 'react'

// CSS
import "./Candidates.css";

class Candidates extends React.Component {
    render() {
        return (
            <div className="votesElection">
                {this.props.candidates.map((candidate) => {
                    return (
                        <div className="votes" key={candidate.id.toNumber()}>
                            <p className="candidate-name">{candidate.name}</p>
                            <p className="candidate-votes">{candidate.voteCount.toNumber()}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Candidates
