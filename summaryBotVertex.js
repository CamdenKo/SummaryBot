//Vertex for summaryBot sentence graph
//Camden ko

//vertex constructor
/*eslint-env node*/
/*eslint-env es6*/

function vertex(name, arrWords) {
  this.name = name
  this.edge = {} //{name: edge weight}
  this.weight = Math.floor(Math.random() * 10) + 1; //1-10
  this.words = {} //{word: count}
  for (let word = 0; word < arrWords.length; word++){
    if (this.words[arrWords[word]]){
      this.words[arrWords[word]]++
    }
    else {
      this.words[arrWords[word]] = 1
    }
  }
  this.numWords = 0
  for (let word in this.words){
    this.numWords += this.words[word]
  }
}

//adds to edge the connection
vertex.prototype.connection = function (connectName, weight) {
  this.edge[connectName] = weight
}


module.exports = vertex
