# SummaryBot
## NPM Package
https://www.npmjs.com/package/summarybot

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
const summarizer = new SummaryBot()
const summary = summaryBot.run(text, numLinesOutput, summaryStatistics)
```
1. Install through NPM
2. Require summaryBot in your program -> this will return a constructor
3. Create an instance of summaryBot using the constructor
4. Call .run(text, numLinesOutput) on the instance which will return the output
5. Call .getTopSentences(numLinesOutput) on the instance if you wish to get the output with a different number of lines

## Example
```javascript

//text is equal to the body of https://www.washingtonpost.com/politics/trump-is-struggling-to-stay-calm-on-russia-one-morning-call-at-a-time/2017/06/22/1da3385a-5762-11e7-b38e-35fd8e0c288f_story.html
const SummaryBot = require('summarybot')
const summarizer = new SummaryBot()
console.log(summaryBot.run(text, 5, false)
```

> President Trump listens during a demonstration at the American Leadership in Emerging Technology event in the East Room of the White House on June 22, 2017. Interviews with 22 senior administration officials, outside advisers, and Trump confidants and allies reveal a White House still trying, after five months of halting progress, to establish a steady rhythm of governance while also indulging and managing Trump’s combative and sometimes self-destructive impulses. That’s what people want to see.”[Inside Trump’s climate decision: After fiery debate, he ‘stayed where he’s always been’] Senior officials have also been devising an overhaul of the WhiteHouse communications operation to better meet the offensive and defensive demands of the president they serve, as well as the 24-hour cycle of tweet-size news. The pace is breakneck, the trajectory upward.” White HouseChief of Staff Reince Priebus walks out of the White House on June 1, 2017, to await President Trump’s remarks in the Rose Garden about the U.S. Some of Priebus’s most senior colleagues speak ill of his leadership abilities, with one tagging him “the most imperiled person here,” although others insist Priebus is in solid standing with the president.Some in the White House fret over what they view as the president’s fits of rage, and Trump’s longtime friends say his mood has been more sour than at any point since they have known him.

## Inputs
#### text:
A single string that consists of only entire sentences. Paragraph integration will be coming later
#### numLinesOutput:
A digit representing the number of sentences you wish summaryBot to output
#### summaryStatistics:
A boolean of whether or not to append statistics to the end of the result
