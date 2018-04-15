import * as d3 from "d3";

import LettersChart from "./prototype/lettersChart";
import SentencesChart from "./prototype/sentencesChar";
import wordChart from "./prototype/wordsChart";

/*
const letters = new LettersChart();
const words = new wordsChart();
const sentences = new SentencesChart();
*/

d3
	.select(".user-input")
	.select("textarea")
		.on("change", function(d) {
			const text = this.value;

		})