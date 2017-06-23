//SUMMARY BOT
//CAMDEN KO
/*eslint-env node*/
/*eslint-env es6*/
//constructor for a summaryBot
//filter out common words?

const Vertex = require('./summaryBotVertex.js')

function summaryBot() {
  this.vertexes = []
  this.dampeningFactor = .85
  this.numVertexes = 0
}

//will properly create graph
summaryBot.prototype.proccessString = function (text) {
  let sentenceArr = text.split(/[.|?|!]/)
  //assuming that the last sentence ENDS with a period
  for (let sentence = 0; sentence < sentenceArr.length - 1; sentence++) {
    this.addVertex(sentenceArr[sentence].toLowerCase().split(' '))
  }
}

//adds vertex
summaryBot.prototype.addVertex = function (wordArr) {
  this.vertexes.push(new Vertex(this.numVertexes++, wordArr.filter((word) => word.length !== 0)))
}

//does an iteration of summaryBot
summaryBot.prototype.iteration = function () {
  //update edge weight
  let similarity
  for (let vertexNum = 0; vertexNum < this.vertexes.length - 1; vertexNum++) {
    for (let innerVertex = vertexNum + 1; innerVertex < this.vertexes.length; innerVertex++) {
      similarity = this.findSimilarity(this.vertexes[vertexNum], this.vertexes[innerVertex])
      this.vertexes[vertexNum].connection(innerVertex, similarity)
      this.vertexes[innerVertex].connection(vertexNum, similarity)
    }
  }
}

//calculates the similarity between two verticies (edge weight)
//in: vertex obj
summaryBot.prototype.findSimilarity = function (vert1, vert2) {
  let shortWords
  let longWords
  if (vert1.numWords < vert2.numWords) {
    shortWords = vert1.words
    longWords = vert2.words
  } else {
    shortWords = vert2.words
    longWords = vert1.words
  }

  let overlap = 0
  for (let word of shortWords) {
    if (longWords.has(word)) {
      overlap++
    }
  }

  return overlap / (Math.log(vert1.numWords + 1) + Math.log(vert2.numWords + 1))
}

//returns the error between last run
summaryBot.prototype.getError = function () {

}

module.exports = summaryBot
