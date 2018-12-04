import React, { Component } from "react";

// Components
import Candidates from "./Candidates";
import Vote from "./Vote";
import Footer from "./Footer";

class Content extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="content">
                    <Candidates candidates={this.props.candidates} />

                    <Vote
                        candidates={this.props.candidates}
                        hasVoted={this.props.hasVoted}
                        castVote={this.props.castVote}
                        userVote={this.props.userVote}
                    />
                </div>

                <Footer account={this.props.account} />
            </React.Fragment>
        );
    }
}

export default Content;
