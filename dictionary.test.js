import {describe, test, expect} from "@jest/globals";
import {Dictionary} from './dictionary.js';

describe('dictionary creation', () => {
    test('should allow an empty array', () => {
        const dictionary = new Dictionary([]);

        expect(dictionary.savedWords).not.toBeUndefined();
    });

    test('should turn values that are not arrays into an empty array', () => {
        const dictionary = new Dictionary('Hello World');

        expect(dictionary.savedWords).not.toBeUndefined();
    });

    test('should add wildcard versions of each word', () => {
        const dictionary = new Dictionary(['cat', 'dog']);

        expect(dictionary.savedWords).toContain('cat');
        expect(dictionary.savedWords).toContain('dog');
        expect(dictionary.savedWords).toContain('*at');
        expect(dictionary.savedWords).toContain('d*g');
        expect(dictionary.savedWords).toContain('do*');
    });

    test('should allow alternative wildcard characters to be used', () => {
        const wildcard = '&'
        const dictionary = new Dictionary(['testing'], wildcard);

        expect(dictionary.savedWords).toContain(`test${wildcard}ng`);
    });
});

describe('isInDictionary', () => {
    test('should return false for values that are not strings', () => {
        const dictionary = new Dictionary(['words', 'here', 'do', 'not', 'matter']);

        expect(dictionary.isInDictionary({ isThisAWord: 'Nope'})).toBe(false);
    });

    test('should return false for values that are not inside the array', () => {
        const dictionary = new Dictionary(['only', 'this', 'day']);

        expect(dictionary.isInDictionary('on')).toBeFalsy();
        expect(dictionary.isInDictionary('th**')).toBeFalsy();
        expect(dictionary.isInDictionary('daily')).toBeFalsy();
    });

    test('should return true when valid wildcards are used', () => {
        const dictionary = new Dictionary(['I', 'like', 'wildcards']);

        expect(dictionary.isInDictionary('*')).toBeTruthy();
        expect(dictionary.isInDictionary('l*ke')).toBeTruthy();
        expect(dictionary.isInDictionary('wildcard*')).toBeTruthy();
    });

    test('should not ignore the case of the input', () => {
        const dictionary = new Dictionary(['words', 'are', 'wild']);

        expect(dictionary.isInDictionary('Words')).toBeFalsy();
        expect(dictionary.isInDictionary('WORDS')).toBeFalsy();
        expect(dictionary.isInDictionary('WoRdS')).toBeFalsy();
        expect(dictionary.isInDictionary('words')).toBeTruthy();
    });
});