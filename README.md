# SummaryBot
## Description
A simple javascript script that will dissect text and pull the most relevant sentences. It uses techniques described in **TextRank: Bringing Order into Texts:** https://web.eecs.umich.edu/~mihalcea/papers/mihalcea.emnlp04.pdf
## Use
1)Copy the three .js files: stopWords.js, summaryBot.js, summaryBotVertex.js into your system

2)Require summaryBot.js in your program -> this will return a constructor

3)Create an instance of summaryBot using the constructor

4)Call .run(text, numLinesOutput) on the instance which will return the output

5)Call .getTopSentences(numLinesOutput) on the instance if you wish to get the output with a different number of lines

## Inputs
#### text:
A single string that consists of only entire sentences. Paragraph integration will be coming later
#### numLinesOutput:
A digit representing the number of sentences you wish summaryBot to output
## Example
```
const summaryBotConstructor = require('./summaryBot.js');
let summaryBot = summaryBotConstructor();
let summary = summaryBot.run(text, numLinesOutput);
