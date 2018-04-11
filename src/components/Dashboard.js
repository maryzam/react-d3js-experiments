import React from "react";

import LettersStats from "./stats/LettersStats";
import WordsStats from "./stats/WordsStats";
import SentencesStats from "./stats/SentencesStats";

class Dashboard extends React.Component { 

	constructor(props) {
		super(props);
	}

	render() {

		return (
			<div className="dashboard">
				<SentencesStats />
				<WordsStats />
				<LettersStats />
			</div>
		);
	}

};

export default Dashboard;