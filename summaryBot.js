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
  this.originalSentences = []
}


//will properly create graph
summaryBot.prototype.proccessString = function (text) {
  this.originalSentences = text.split(/[.|?|!]/)
  if (this.originalSentences[this.originalSentences.length - 1] === '') {
    this.originalSentences.pop()
  }
  for (let sentence = 0; sentence < this.originalSentences.length; sentence++) {
    this.addVertex(this.originalSentences[sentence].toLowerCase().split(' '))
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

//do i update values one at a time or all at once?
summaryBot.prototype.updateAllVertexWeights = function () {
  let totalEdgeWeights = this.getEdgeTotals()
  let tempSum = 0
  for (let vertexNum = 0; vertexNum < this.numVertexes; vertexNum++) {
    for (let otherVertex = 0; otherVertex < this.numVertexes; otherVertex++) {
      if (otherVertex !== vertexNum) {
        tempSum += this.vertexes[vertexNum].edge[otherVertex] / totalEdgeWeights[otherVertex] * this.vertexes[otherVertex].weight
      }
    }
    this.vertexes[vertexNum].weight = (this.dampeningFactor) + this.dampeningFactor * tempSum
    tempSum = 0
  }
}

summaryBot.prototype.getEdgeTotals = function () {
  let out = []
  let tempSum = 0
  for (let vertexNum = 0; vertexNum < this.numVertexes; vertexNum++) {
    tempSum = 0
    for (let edgeN in this.vertexes[vertexNum].edge) {
      tempSum += this.vertexes[vertexNum].edge[edgeN]
    }
    out.push(tempSum)
  }
  return out
}
//calculates the similarity between two verticies (edge weight)
//in: vertex obj
summaryBot.prototype.findSimilarity = function (vert1, vert2) {
  let overlap = 0
  for (let word of vert1.words) {
    if (vert2.words.has(word)) { //set O(constant)
      overlap++
    }
  }

  return overlap / (Math.log(vert1.numWords) + Math.log(vert2.numWords))
}

//returns the error between last run
summaryBot.prototype.getTopSentences = function (numSentences) {
  if (numSentences > this.numVertexes) {
    throw new Error("there's not that many sentences to print")
  }
  this.sortVertexesByWeight()
  let topSentencesArr = []
  for (let sentenceOut = 0; sentenceOut < numSentences; sentenceOut++) {
    topSentencesArr.push(this.vertexes[sentenceOut])
  }

  //out now only has the top sentence. now reorder by original order
  topSentencesArr.sort(function (a, b) {
    if (a.name < b.name) return -1
    return 1
  })

  let out = topSentencesArr.map(function (vert) {
    return vert.origSentence + '. '
  })
  //console.log(out)
  return out.join(' ')
}

summaryBot.prototype.sortVertexesByWeight = function () {
  this.vertexes.sort(function (a, b) {
    if (a.weight < b.weight) return 1
    if (a.weight > b.weight) return -1
    return 0
  })
}
module.exports = summaryBot
