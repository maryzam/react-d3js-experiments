import React from "react";
import PropTypes from "prop-types"; 

import * as Analyzer from "../utils/textAnalyzer";

import Overview from "./stats/Overview";
import LettersStats from "./stats/LettersStats";
import WordsStats from "./stats/WordsStats";
import SentensesStats from "./stats/SentencesStats";

// todo
const width = 400;
const height = 300;

class Dashboard extends React.Component { 

	state = {
		 isBigEnough: false,
		 sentences: [],
		 words: [],
		 letters: []
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		const { text, minLength } = nextProps;
		const isBigEnough = text.length >= minLength;
		if ( !isBigEnough && !prevState.isBigEnough) {
			return null;
		}
		if (!isBigEnough) {
			return { isBigEnough: false };
		}
		return {
			isBigEnough: isBigEnough,
			sentences: Analyzer.countSentences(text),
			words: Analyzer.countWords(text),
			letters: Analyzer.countLetters(text)
		};
	}

	shouldComponentUpdate(nextProps, nextState) {
		return (this.props.length !== nextProps.text.Length) ||
			   (this.props.text !== nextProps.text);
	}

	render() {
		if (!this.state.isBigEnough) {
			return (
				<div className="dashboard">
					<p><em>Please, enter text that contains at least { this.props.minLength} signs.</em></p>
				</div>
			)
		}
		const overview = { 
			totalSentences: this.state.sentences.length
		};

		return (
			<div className="dashboard">
				<LettersStats data={ this.state.letters } width={width} height={height}/>
				<SentensesStats data={ this.state.sentences } width={width} height={height}/>
				<Overview data={ overview }/>
				<WordsStats data={ this.state.words } width={width} height={height}/>
			</div>
		);
	}

};

Dashboard.propTypes = {
  text: PropTypes.string.isRequired
};

export default Dashboard;