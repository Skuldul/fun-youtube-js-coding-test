export class Dictionary {
    constructor(words, wildcard) {
        if (!Array.isArray(words)) {
            words = [];
        }

        if (typeof wildcard !== 'string') {
            wildcard = '*';
        }

        /* savedWords will store every possible wildcard combination of all words in the array, which will allow methods
           like isInDictionary to have fast lookup times, even when using a wildcard. For example, 'cat' will become:
           [ 'cat', '*at', 'c*t', 'ca*' ] */
        this.savedWords = words.flatMap(word => {
            const wildcardWords = [word];

            for (let i = 0; i < word.length; i++) {
                const start = word.substring(0, i);
                const end = word.substring(i + 1);

                wildcardWords[i + 1] = `${start}${wildcard}${end}`;
            }

            return wildcardWords;
        });
    }

    isInDictionary(word) {
        if (typeof word !== `string`) {
            return false;
        }

        return this.savedWords.includes(word);
    }
}