//SUMMARY BOT
//CAMDEN KO
//use summaryBot.
/*eslint-env node*/
/*eslint-env es6*/
//constructor for a summaryBot
//filter out common words?

const Vertex = require('./summaryBotVertex.js')
const stopWords = require('./stopWords.js')

function summaryBot() {
  this.vertexes = []
  this.dampeningFactor = .85
  this.numVertexes = 0
  this.originalSentences = []
  this.filteredSentences = []
  this.errorThreshold = .01
  this.unconnectedVertexes = new Set()
  this.infoOnLastRun = {}
}

summaryBot.prototype.summary = function () {
  if (this.infoOnLastRun) {

    // REMOVE LATER FOR TESTING ONLY
    for (let vert = 0; vert < this.vertexes.length; vert++) {
      console.log(this.vertexes[vert].weight)
    }
    //REMOVE ME
    let out = ""
    let origNumWords = this.originalSentences.join(' ').split(' ').length
    out += "\n\nOriginal Number of Lines: " + this.originalSentences.length + "\n"
    out += "Original Number of Words: " + origNumWords + "\n"
    out += "Condensed Number of Lines: " + this.infoOnLastRun.numLines + '\n'
    out += "Condensed Number of Words: " + this.infoOnLastRun.numWords + '\n'
    out += "% words kept " + Math.round(100 * this.infoOnLastRun.numWords / origNumWords * 100) / 100 + "%"
    return out + "\nError: " + Math.round(10000 * this.infoOnLastRun.err) / 100 + "%"
  }
}

summaryBot.prototype.run = function (text, numReturnSentences, testStatistics) {
  if (typeof (text) != 'string' || typeof (numReturnSentences) != 'number') {
    throw new TypeError('ensure that you pass valild values into summaryBot.prototype.run')
  }
  this._proccessString(text)
  this._initialize()
  let lastV0
  let curV0
  let off = 10
  while (off > this.errorThreshold) {
    this._updateAllVertexWeights()
    if (!curV0) {
      curV0 = this.vertexes[0].weight
    } else {
      lastV0 = curV0
      curV0 = this.vertexes[0].weight
      off = Math.abs(curV0 - lastV0)
    }
  }

  let output = this.getTopSentences(numReturnSentences)
  this.infoOnLastRun = {
    err: off,
    numLines: numReturnSentences,
    numWords: output.split(' ').length
  }
  if (testStatistics) {
    output += this.summary()
  }
  return output
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
  return out.join('. ') + '.'
}

//will properly create graph
summaryBot.prototype._proccessString = function (text) {
  this.originalSentences = text.split(/[.|?|!] /)
  for (let sentence = 0; sentence < this.originalSentences.length; sentence++) {
    this.filteredSentences[sentence] = this.originalSentences[sentence].replace(/[^a-zA-Z0-9 \']/g, " ")
  }

  this.filteredSentences = this.filteredSentences.filter(function (content) {
    return content != '';
  })

  for (let sentence = 0; sentence < this.filteredSentences.length; sentence++) {
    this._addVertex(this.filteredSentences[sentence].toLowerCase().split(' ').filter((word) => word && word.length !== 1 && !stopWords.has(word)))
  }
}

//adds vertex
summaryBot.prototype._addVertex = function (wordArr) {
  this.vertexes.push(new Vertex(this.numVertexes++, wordArr))
}

//sets the similarity edge weights for each node
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
      if (otherVertex !== vertexNum && !this.unconnectedVertexes.has(otherVertex)) {
        tempSum += this.vertexes[vertexNum].edge[otherVertex] / totalEdgeWeights[otherVertex] * this.vertexes[otherVertex].weight
      }
    }
    this.vertexes[vertexNum].weight = (1 - this.dampeningFactor) + this.dampeningFactor * tempSum
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
  // for (let word of vert1.words) {
  //   if (vert2.words.has(word)) { //set O(constant)
  //     overlap++
  //   }
  // }
  for(let word in vert1.words){
    if(vert2.words[word]){

      overlap += Math.pow(vert1.words[word] * vert2.words[word],.5)
    }
  }
  return overlap / (Math.log(vert1.numWords) + Math.log(vert2.numWords))
}

summaryBot.prototype._sortVertexesByWeight = function () {
  this.vertexes.sort(function (a, b) {
    if (a.weight < b.weight) return 1
    if (a.weight > b.weight) return -1
    return 0
  })
}
module.exports = summaryBot
