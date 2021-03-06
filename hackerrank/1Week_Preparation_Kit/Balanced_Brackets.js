'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'isBalanced' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function isBalanced(s) {
    s = s.split('')
    const starts = ['{', '[', '(']
    const ends = ['}', ']', ')']
    const stack = []
    
    while(s.length) {
        const tmp = s.shift()
        const isStart = starts.findIndex(e => e === tmp)
        if (isStart >= 0) {
            stack.push(isStart)
            continue
        }
        const isEnd = ends.findIndex(e => e === tmp)
        const end = stack.pop()
        if (end !== isEnd) return 'NO' 
    }
    if (!stack.length) return 'YES'
    return 'NO'
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const s = readLine();

        const result = isBalanced(s);

        ws.write(result + '\n');
    }

    ws.end();
}
