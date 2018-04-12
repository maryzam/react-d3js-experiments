import React from "react";

import Overview from "./stats/Overview";
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
				<LettersStats />
				<SentencesStats />
				<Overview />
				<WordsStats />
			</div>
		);
	}

};

export default Dashboard;