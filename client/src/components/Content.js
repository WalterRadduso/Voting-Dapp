import React, { Component } from "react";

// Components
import Candidates from "./Candidates";
import Vote from "./Vote";
import Footer from "./Footer";

class Content extends Component {
    render() {
        let {account, candidates, castVote, hasVoted, userVote} = this.props;

        return (
            <React.Fragment>
                <div className="content">
                    <Candidates candidates={candidates} />

                    <Vote
                        candidates={candidates}
                        hasVoted={hasVoted}
                        castVote={castVote}
                        userVote={userVote}
                    />
                </div>

                <Footer account={account} />
            </React.Fragment>
        );
    }
}

export default Content;
