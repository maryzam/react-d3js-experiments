import React from "react";

import Header from "./components/Header";
import UserInput from "./components/UserInput";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";

const minTextLength = 50;
const maxTextLength = 2500;

class App extends React.Component { 

	state = {
		text: ''
	};

	onTextInput = (event) => {
		const text = event.target.value;
		this.setState({ 
			text: text.slice(0, maxTextLength)
		});
	}

	render() {
		return (
			<div className="page">
				<Header />
				<main>
					<UserInput 
						text={ this.state.text } 
						onChange={ this.onTextInput } 
						minLength={ minTextLength }
						maxLength={ maxTextLength } />
					<Dashboard 
						text={this.state.text }
						minLength = { minTextLength }/>
				</main>
				<Footer />
			</div>
		);
	}

}

export default App;