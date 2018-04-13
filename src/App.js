import React from "react";

import * as Analyzer from "./utils/textAnalyzer";

import Header from "./components/Header";
import UserInput from "./components/UserInput";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";

class App extends React.Component { 

	constructor(props) { 
		super(props);
		this.state = { text: '' };
	}

	onTextInput = (event) => {
		this.setState({ 
			text: event.target.value.trim()
		});
	}

	render() {
		const { text } = this.state;

		const letters = Analyzer.getLettersStats(text);
		const words = Analyzer.getWordsStats(text);
		const sentences = Analyzer.getSentencesStats(text);

		console.log(letters, words, sentences);

		return (
			<div className="page">
				<Header />
				<main>
					<UserInput onChange={ this.onTextInput } />
					<Dashboard />
				</main>
				<Footer />
			</div>
		);
	}

}

export default App;