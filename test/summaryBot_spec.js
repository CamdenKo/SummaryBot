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
      summaryBot.proccessString('hello a. hi a. greetings a.')
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
      summaryBot.proccessString('hello hi. hi a. greetings hello.')
      summaryBot.iteration()
      expect(Object.keys(summaryBot.vertexes[0].edge).length).to.equal(2)
    })
    it('should calculate the weight via similarity correctly if 100% similair', () => {
      summaryBot.proccessString('hello hi. hi hello.')
      summaryBot.iteration()
      let otherVert = 1
      expect(summaryBot.vertexes[0].edge[1]).to.equal(2 / (2 * Math.log(2)))
    })
  })

  describe('getEdgeTotals', function () {
    it('returns an array with one entry per vertex', function () {
      summaryBot.proccessString('hello hi. hi sad guy. hello I feel sad.')
      summaryBot.iteration()
      expect(summaryBot.getEdgeTotals().length).to.equal(3)
    })
  })

  describe('sortVertexesByWeight', function () {
    it('should sort the vertexes descending by weight', function () {
      summaryBot.proccessString('hello my friend. im SO tired. jeez im sleepy.')
      summaryBot.sortVertexesByWeight()
      expect(summaryBot.vertexes[0].weight).to.be.greaterThan(summaryBot.vertexes[2].weight)
    })
  })
  describe('updateAllVertexWeights', function () {
    it('works', function () {
      summaryBot.proccessString('In high school, I followed my interest in high fantasy to take a speculative fiction course. This is where I got a real exposure to science fiction. Titles like Lord of Light and The Martian captivated me in the same way that high fantasy did when I was younger. Nowadays, I generally consume a lot less media, whether it be in print or in video. However, when I decided to take a writing course, I knew that I wanted it to be inside the realm of speculative fiction. Looking through the descriptions of all the courses, the only one that really caught my eye was Jewish SF 2290W. Although I have a limited exposure to Jewish culture, I believed that I would have enough to still be able to contribute to the conversation. Entering into the course, I hope that its focus is more on the literary aspects of science fiction. I want us to spend more time focusing on the influences of the author’s past in the text. As such, I wish that we would get more insight into the author’s lives before we read each piece. So far, I’ve found our discussion about the biblical references in I Have No Mouth and I Must Scream to be the most engaging. I think the class would be even more engaging if discussions like that occurred with less guidance. I would prefer if the class was given a topic to discuss instead of a specific question. While that plan may not work given how much content we go through in a single 50-minute class, I think that students should be given a larger opportunity to lead the discussion. I’m excited for the coming semester, and if the first week has been any indication, this class will offer me a lot of insight into both Judaism and science fiction.')
      summaryBot.iteration()
      summaryBot.updateAllVertexWeights()
      summaryBot.updateAllVertexWeights()
      summaryBot.updateAllVertexWeights()
      summaryBot.updateAllVertexWeights()
      summaryBot.updateAllVertexWeights()
      summaryBot.updateAllVertexWeights()
      summaryBot.updateAllVertexWeights()
      summaryBot.updateAllVertexWeights()
      summaryBot.updateAllVertexWeights()
      summaryBot.updateAllVertexWeights()
      summaryBot.updateAllVertexWeights()
      console.log(summaryBot.getTopSentences(3))

    })
  })
})
