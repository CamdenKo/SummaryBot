/*eslint-env node*/
/*eslint-env mocha*/

const summaryBotConstructor = require('../summaryBot.js')
const Vertex = require('../summaryBotVertex.js')
const chai = require('chai')
const spies = require('chai-spies')
chai.use(spies)
chai.should()
let summaryBot = new summaryBotConstructor()
const expect = require('chai').expect;

describe('summaryBot', () => {
  beforeEach(function () {
    summaryBot = new summaryBotConstructor()
  })

  describe('add vertex', function () {
    it('adds an object of type "vertex"', function () {
      summaryBot.addVertex(['a', 'b'])
      expect(summaryBot.vertexes[0]).to.be.an.instanceOf(Vertex)
    })
  })

  describe('proccess string', function () {
    it('creates the same number of vetexes as sentences', function () {
      summaryBot.proccessString('hello. hi. greetings.')
      expect(summaryBot.vertexes.length).to.equal(3)
    })
    // it('calls createVertex once for each sentence', () => {
    //   var spyFunc = chai.spy(summaryBot.addVertex)
    //   summaryBot.proccessString('hello. hi. greetings.')
    //   expect(spyFunc).to.have.been.called.exactly(3)
    // })
  })

  describe('iteration', function () {
    it('every vertex should have one connection', function () {
      summaryBot.proccessString('hello hi. hi. greetings hello.')
      summaryBot.iteration()
      expect(Object.keys(summaryBot.vertexes[0].edge).length).to.equal(2)
    })
    it.only('should calculate the weight via similarity correctly if 100% similair', () => {
      summaryBot.proccessString('hello hi. hi hello')
      summaryBot.iteration()
      let otherVert = 1
      console.log('edge weight', summaryBot.vertexes[0].edge)
      expect(summaryBot.vertexes[0].edge[1]).to.equal(2 / (2 * Math.log(3)))
    })
  })
})
