/* eslint-disable no-useless-escape */
// custom mode

import CodeMirror from 'codemirror';

CodeMirror.defineMode('hosts', function () {
    function tokenBase(stream) {
        if (stream.eatSpace()) return null;

        let sol = stream.sol();
        let ch = stream.next();

        let s = stream.string;

        if (ch === '#') {
            stream.skipToEnd();
            return 'comment';
        }
        if (!s.match(/^\s*([\d\.]+|[\da-f:\.%lo]+)\s+\w/i)) {
            return 'error';
        }

        if (sol && ch.match(/[\w\.:%]/)) {
            stream.eatWhile(/[\w\.:%]/);
            return 'ip';
        }

        return null;
    }

    function tokenize(stream, state) {
        return (state.tokens[0] || tokenBase)(stream, state);
    }

    return {
        startState: function () {
            return { tokens: [] };
        },
        token: function (stream, state) {
            return tokenize(stream, state);
        },
        lineComment: '#'
    };
});
