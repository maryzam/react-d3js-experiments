import * as d3 from "d3";

import LettersChart from "./prototype/lettersChart";
import SentencesChart from "./prototype/sentencesChar";
import WordsChart from "./prototype/wordsChart";

import * as Analyzer from "./utils/TextAnalyzer";


const lettersChart = new LettersChart("#letters");
const wordsChart = new WordsChart("#words");
const sentencesChart = new SentencesChart("#sentences");

d3
	.select(".user-input")
	.select("textarea")
		.on("change", function(d) {
			const text = this.value.trim();

			const letters = Analyzer.countLetters(text);
			lettersChart.update(letters);

			const words = Analyzer.countWords(text);
			wordsChart.update(words);

			const sentences = Analyzer.countSentences(text);
			sentencesChart.update(sentences);

		})