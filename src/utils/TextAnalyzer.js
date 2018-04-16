
const sentenceEndingRegex = /([^\.!\?]+[\.!\?]+)|([^\.!\?]+$)/;
const alphaNumericsOnlyRegex = /[^0-9a-zA-Z]/gi;
const alphabetOnlyRegex = /[^a-z]/gi;

const alphabet = "abcdefghijklmnopqrstuvwxyz".split('');

export function countLetters(text = '') {
	const letters = {};
	
	text
		.toLowerCase()
		.replace(alphabetOnlyRegex, '')
		.split('')
		.forEach((c) => {
			letters[c] = (letters[c] || 0) + 1;
		});

	return alphabet.map((c) => ({
		letter: c,
		count: letters[c] || 0
	}));
};

export function countWords(text = '') {
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

export function countSentences(text = '') {
	const sentences = [];
	let order = 0;
	text
		.split(sentenceEndingRegex)
		.forEach((s) => {
			 const words = countWords(s);
			 if (words.length > 0) {
			 	sentences.push({
			 		order: order,
			 		words: words
			 	});
			 	order++;
			 }
		});

	return sentences;
}

