
const sentenceEndingRegex = /([^\.!\?]+[\.!\?]+)|([^\.!\?]+$)/;
const alphaNumericsOnlyRegex = /[^0-9a-zA-Z]/gi;
const alphabetOnlyRegex = /[^a-z]/gi;

export function getLettersStats(text = '') {
	const letters = {};
	
	text
		.toLowerCase()
		.replace(alphabetOnlyRegex, '')
		.split('')
		.forEach((c) => {
			letters[c] = (letters[c] || 0) + 1;
		});

	return Object.keys(letters)
				 .map((c) => ({ letter: c, count: letters[c] }));
};

export function getWordsStats(text = '') {
	const words = {};
	text
		.replace(alphaNumericsOnlyRegex, ' ')
		.split(' ')
		.forEach((current) => {
			if (current.length > 0) {
				words[current] = (words[current] || 0) + 1;
			}
		});

	return Object.keys(words)
				 .map((w) => ({ word: w, count: words[w] }));
};

export function getSentencesStats(text = '') {
	const sentences = [];
	text
		.split(sentenceEndingRegex)
		.forEach((s) => {
			 const words = getWordsStats(s);
			 if (words.length > 0) {
			 	sentences.push({
			 		words: words
			 	});
			 }
		});

	return sentences;
}

