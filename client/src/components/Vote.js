import React from 'react'

class vote extends React.Component {
    constructor(props) {
        super(props);

        this.voteButtons = this.voteButtons.bind(this);
        this.voteChoose = this.voteChoose.bind(this);
    }

    /**
     * Show this html if the user has no voted yet.
     */
    voteButtons() {
        return (
            <div>
                <p>¿Do you want to vote?</p>

                {this.props.candidates.map((candidate) => {
                    return (
                        <button
                            key={candidate.id.toNumber()}
                            onClick={() => this.props.castVote(candidate.id.toNumber())}
                            className='btn btn-primary'>
                            {candidate.name}
                        </button>
                    )
                })}
            </div>
        )
    }

    /**
     * Show this html if the user already voted.
     */
    voteChoose() {
        return (
            <div>
                You have voted for <span>"{this.props.userVote}"</span>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.props.hasVoted ? this.voteChoose() : this.voteButtons()}
            </div>
        )
    }
}

export default vote;
