import React from "react";

const byWordLength = function(a, b) { return b.word.length - a.word.length; }
const byCount = function(a, b) { return b.count - a.count; }

const Overview = ({ letters, sentences, words }) => {

	const longest = words.sort(byWordLength)[0].word;

	return ( 
		<div className="stats">
			<h4>Overview</h4>
			<p>Total sentences: <span>{ sentences.length }</span></p>
			<p>Total words: <span>{ words.length }</span></p>
			<p>The longest word is <span>{ longest } </span> {`(${longest.length} letters)`}</p>
		</div>
	);
};

export default Overview;