import React from 'react'

class vote extends React.Component {
    constructor(props) {
        super(props);

        this.voteYes = this.voteYes.bind(this);
        this.voteNo = this.voteNo.bind(this);
        this.voteButtons = this.voteButtons.bind(this);
        this.voteChoose = this.voteChoose.bind(this);
    }

    voteYes() {
        this.props.castVote(1);
    }

    voteNo() {
        this.props.castVote(2);
    }

    voteButtons() {
        return (
            <div>
                <p>¿Do you want to vote?</p>

                <button onClick={this.voteYes} className='btn btn-primary'>Yes</button>
                <button onClick={this.voteNo} className='btn btn-primary'>No</button>
            </div>
        )
    }

    voteChoose() {
        return (
            <div>
                You has vote <span>"{this.props.userVote}"</span>
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
