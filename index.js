import {Dictionary} from './dictionary.js';

console.log('Testing...', '\n\nDefault Dictionary Wildcard Symbol');

const defaultDictionary = new Dictionary(['cat', 'dog', 'bat', 'bit']);

console.log(defaultDictionary.isInDictionary('cat')); // true
console.log(defaultDictionary.isInDictionary('c*t')); // true
console.log(defaultDictionary.isInDictionary('bi*')); // true
console.log(defaultDictionary.isInDictionary('*at')); // true
console.log(defaultDictionary.isInDictionary('ant')); // false
console.log(defaultDictionary.isInDictionary('k*t')); // false

console.log('\nAlternative Dictionary Wildcard Symbol');

const alternativeDictionary = new Dictionary(['apple', 'pear', 'mouse', 'duck'], '@');

console.log(alternativeDictionary.isInDictionary('apple')); // true
console.log(alternativeDictionary.isInDictionary('d@ck'));  // true
console.log(alternativeDictionary.isInDictionary('@uck'));  // true
console.log(alternativeDictionary.isInDictionary('mous@')); // true
console.log(alternativeDictionary.isInDictionary('ap*le')); // false
console.log(alternativeDictionary.isInDictionary('bat'));   // false
