import React, {Component} from "react";

// Libraries - Contracts
import ElectionContract from "../contracts/Election.json";
import getWeb3 from "../utils/getWeb3";
import truffleContract from "truffle-contract";

// Components
import Header from "./Header";
import Loading from "./Loading";
import Content from "./Content";
import { Row, Col } from 'antd';

// CSS
import 'antd/dist/antd.css';
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            account: null,
            candidates: [],
            election: null,
            electionInstance: null,
            hasVoted: false,
            loading: true,
            storageValue: 0,
            userVote: "",
            voting: false,
            web3: null
        };

        this.castVote = this.castVote.bind(this);
        this.checkUserVote = this.checkUserVote.bind(this);
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

            // Set web3, accounts, and contract to the state, and then return those values.
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
        // Connect to the Election Contract.
        let connection = await this.connect();

        // Get the account of the user.
        let account = await connection.web3.eth.getCoinbase();

        this.setState({account});

        // Create an instance of the Election contract.
        let electionInstance = await connection.election.deployed();

        this.setState({electionInstance});

        // Get the candidates and his votes.
        await this.countCandidates();

        // Get if the actual user already vote.
        let hasVoted = await electionInstance.voters(this.state.account);

        this.setState({hasVoted, loading: false});

        this.checkUserVote();
    };

     /**
     * This function vote for one candidate.
     * @param candidateId
     * @returns {Promise<void>}
     */
    async castVote(candidateId) {
        this.setState({voting: true});

        await this.state.electionInstance.vote(candidateId, {from: this.state.account});

        await this.countCandidates();

        this.setState({hasVoted: true});

        await this.checkUserVote();
    }

    /**
     * Get the candidates and his votes.
     * @returns {Promise<void>}
     */
    async countCandidates() {
        let candidatesCount = await this.state.electionInstance.candidatesCount();

        let candidates = [];

        for (let i = 1; i <= candidatesCount; i++) {
            let candidate = await this.state.electionInstance.candidates(i);

            candidates.push({
                id: candidate[0],
                name: candidate[1],
                voteCount: candidate[2]
            });

            this.setState({candidates: candidates});
        }
    }

    async checkUserVote() {
        if (this.state.hasVoted) {
            let userVote = await this.state.electionInstance.candidateSelected(this.state.account);

            this.setState({userVote});
        }
    }

    render() {
        let {account, candidates, hasVoted, userVote, web3} = this.state;

        return (
            <div className="app">
                <Row>
                    <Col span={24}>
                        <Header />
                    </Col>

                    <Col span={24} className="app-content">
                        {
                            !web3 ?
                                <Loading /> :
                                <Content
                                    account={account}
                                    candidates={candidates}
                                    hasVoted={hasVoted}
                                    castVote={this.castVote}
                                    userVote={userVote}
                                />
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}

export default App;
