# SummaryBot
## Description
A simple javascript script that will dissect text and pull the most relevant sentences. It uses techniques described in **TextRank: Bringing Order into Texts:** https://web.eecs.umich.edu/~mihalcea/papers/mihalcea.emnlp04.pdf

## Use
CLI
```
npm install -S summarybot
```

Javascript
```javascript

const SummaryBot = require('summarybot');
const summarizer = SummaryBot()
const summary = summaryBot.run(text, numLinesOutput)
```
1. Install through NPM
2. Require summaryBot in your program -> this will return a constructor
3. Create an instance of summaryBot using the constructor
4. Call .run(text, numLinesOutput) on the instance which will return the output
5. Call .getTopSentences(numLinesOutput) on the instance if you wish to get the output with a different number of lines

## Inputs
#### text:
A single string that consists of only entire sentences. Paragraph integration will be coming later
#### numLinesOutput:
A digit representing the number of sentences you wish summaryBot to output
