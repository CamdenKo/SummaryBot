//Vertex for summaryBot sentence graph
//Camden ko

//vertex constructor
/*eslint-env node*/
/*eslint-env es6*/

function vertex(name, arrWords) {
  this.name = name
  this.edge = {} //name: edgeW
  this.weight = Math.floor(Math.random() * 10) + 1; //1-10
  this.origSentence = arrWords.join(' ')
  this.words = new Set(arrWords)
  this.numWords = this.words.size
}

//adds to edge the connection
vertex.prototype.connection = function (connectName, weight) {
  this.edge[connectName] = weight
}

vertex.prototype.getWeight = function () {
  return this.weight;
}

module.exports = vertex
