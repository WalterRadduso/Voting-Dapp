import React, {Component} from "react";

import ElectionContract from "../contracts/Election.json";
import getWeb3 from "../utils/getWeb3";
import truffleContract from "truffle-contract";

import Header from "./Header";
import Loading from "./Loading";
import Content from "./Content";

import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            storageValue: 0,
            web3: null,
            account: null,
            election: null,
            candidates: [],
            hasVoted: false,
            loading: true,
            voting: false,
            electionInstance: null
        };

        // this.watchEvents = this.watchEvents.bind(this);
        this.castVote = this.castVote.bind(this);
        this.countCandidates = this.countCandidates.bind(this);
    }

    connect = async () => {
        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3();

            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();

            // Get the contract instance.
            const election = truffleContract(ElectionContract);
            election.setProvider(web3.currentProvider);

            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            this.setState({web3, accounts, election});

            return({web3, accounts, election});
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`
            );

            console.log(error);
        }
    };

    async componentDidMount() {
        let connection = await this.connect();

        let account = await connection.web3.eth.getCoinbase();

        this.setState({account});

        let electionInstance = await connection.election.deployed();

        this.setState({electionInstance});

        await this.countCandidates();

        let hasVoted = await electionInstance.voters(this.state.account);

        this.setState({hasVoted, loading: false});
    };

    // watchEvents() {
    //     // Trigger event when vote is counted, not when component renders
    //     this.state.electionInstance.votedEvent({}, {
    //         fromBlock: 0,
    //         toBlock: 'latest'
    //     }).watch((error, event) => {
    //         this.setState({voting: false});
    //     });
    // }

    async castVote(candidateId) {
        this.setState({voting: true});

        await this.state.electionInstance.vote(candidateId, {from: this.state.account});

        await this.countCandidates();

        this.setState({hasVoted: true});
    }

    async countCandidates() {
        this.setState({candidates: []});

        let candidatesCount = await this.state.electionInstance.candidatesCount();

        for (let i = 1; i <= candidatesCount; i++) {
            let candidate = await this.state.electionInstance.candidates(i);

            let candidates = [...this.state.candidates];

            candidates.push({
                id: candidate[0],
                name: candidate[1],
                voteCount: candidate[2]
            });

            this.setState({candidates: candidates});
        }
    }

    render() {
        return (
            <div className="App">
                <Header />

                {
                    !this.state.web3 ?
                    <Loading /> :
                    <Content
                        account={this.state.account}
                        candidates={this.state.candidates}
                        hasVoted={this.state.hasVoted}
                        castVote={this.castVote}
                        userVote={"Yes"}
                    />
                }
            </div>
        );
    }
}

export default App;
