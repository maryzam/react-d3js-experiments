import React from "react";

const byWordLength = function(a, b) { return b.word.length - a.word.length; }
const byCount = function(a, b) { return b.count - a.count; }

const Overview = ({ letters, sentences, words }) => {

	const longest = [].concat(words).sort(byWordLength)[0].word;
	const totalWords = words.reduce((acc, curr) => acc + curr.count, 0);
	return ( 
		<div className="stats">
			<p>Total sentences: <span>{ sentences.length }</span></p>
			<p>Total words: <span>{ totalWords }</span></p>
			<p>The longest word is <span>{ longest } </span> {`(${longest.length} letters)`}</p>
		</div>
	);
};

export default Overview;