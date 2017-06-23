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
  this.filteredSentences = []
  this.errorThreshold = .01
  this.unconnectedVertexes = new Set()
}

summaryBot.prototype.run = function (text, numReturnSentences) {
  this._proccessString(text)
  this._initialize()
  //fix to use error instead
  let lastV0
  let curV0
  let off
  for (let iterate = 0; iterate < 20; iterate++) {
    this._updateAllVertexWeights()
    if (iterate === 0) curV0 = this.vertexes[0].weight
    else {
      lastV0 = curV0
      curV0 = this.vertexes[0].weight
      off = curV0 - lastV0
    }
  }
  return this.getTopSentences(numReturnSentences)
}
//will properly create graph
summaryBot.prototype._proccessString = function (text) {
  this.originalSentences = text.split(/[.|?|!] /)
  for (let sentence = 0; sentence < this.originalSentences.length; sentence++) {
    this.filteredSentences[sentence] = this.originalSentences[sentence].replace(/[^a-zA-Z0-9 ]/g, " ")
  }

  this.filteredSentences = this.filteredSentences.filter(function (content) {
    return content != '';
  })

  for (let sentence = 0; sentence < this.filteredSentences.length; sentence++) {
    this._addVertex(this.filteredSentences[sentence].toLowerCase().split(' '))
  }
}

//adds vertex
summaryBot.prototype._addVertex = function (wordArr) {
  this.vertexes.push(new Vertex(this.numVertexes++, wordArr.filter((word) => word.length !== 0)))
}

//does an iteration of summaryBot
summaryBot.prototype._initialize = function () {
  //update edge weight
  let similarity
  for (let vertexNum = 0; vertexNum < this.vertexes.length - 1; vertexNum++) {
    for (let innerVertex = vertexNum + 1; innerVertex < this.vertexes.length; innerVertex++) {
      similarity = this._findSimilarity(this.vertexes[vertexNum], this.vertexes[innerVertex])
      this.vertexes[vertexNum].connection(innerVertex, similarity)
      this.vertexes[innerVertex].connection(vertexNum, similarity)
    }
  }
}

//do i update values one at a time or all at once?
summaryBot.prototype._updateAllVertexWeights = function () {
  let totalEdgeWeights = this._getEdgeTotals()
  var tempSum = 0
  for (let vertexNum = 0; vertexNum < this.numVertexes; vertexNum++) {
    for (let otherVertex = 0; otherVertex < this.numVertexes; otherVertex++) {
      if (otherVertex !== vertexNum && !this.unconnectedVertexes.has(otherVertex) && this.vertexes[vertexNum].weight !== 0) {
        tempSum += this.vertexes[vertexNum].edge[otherVertex] / totalEdgeWeights[otherVertex] * this.vertexes[otherVertex].weight
      }
    }
    this.vertexes[vertexNum].weight = (this.dampeningFactor) + this.dampeningFactor * tempSum
    tempSum = 0
  }
}

summaryBot.prototype._getEdgeTotals = function () {
  let out = []
  let tempSum = 0
  for (let vertexNum = 0; vertexNum < this.numVertexes; vertexNum++) {
    tempSum = 0
    for (let edgeN in this.vertexes[vertexNum].edge) {
      tempSum += this.vertexes[vertexNum].edge[edgeN]
    }
    //if this node is unrelated set weight to 0
    if (tempSum === 0) {
      this.vertexes[vertexNum].weight = 0
      this.unconnectedVertexes.add(vertexNum)
    }
    out.push(tempSum)
  }
  return out
}
//calculates the similarity between two verticies (edge weight)
//in: vertex obj
summaryBot.prototype._findSimilarity = function (vert1, vert2) {
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
  this._sortVertexesByWeight()
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
    return this.originalSentences[vert.name]
  }.bind(this))
  return out.join('. ')
}

summaryBot.prototype._sortVertexesByWeight = function () {
  this.vertexes.sort(function (a, b) {
    if (a.weight < b.weight) return 1
    if (a.weight > b.weight) return -1
    return 0
  })
}
module.exports = summaryBot
