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
      summaryBot._addVertex(['a', 'b'])
      expect(summaryBot.vertexes[0]).to.be.an.instanceOf(Vertex)
    })
  })

  describe('proccess string', function () {
    it('creates the same number of vetexes as sentences', function () {
      summaryBot._proccessString('hello a. hi a. greetings a.')
      expect(summaryBot.vertexes.length).to.equal(3)
    })
    // it('calls createVertex once for each sentence', () => {
    //   var spyFunc = chai.spy(summaryBot._addVertex)
    //   summaryBot._proccessString('hello. hi. greetings.')
    //   expect(spyFunc).to.have.been.called.exactly(3)
    // })
  })

  describe('_initialize', function () {
    it('every vertex should have one connection', function () {
      summaryBot._proccessString('hello hi. hi a. greetings hello.')
      summaryBot._initialize()
      expect(Object.keys(summaryBot.vertexes[0].edge).length).to.equal(2)
    })
    it('should calculate the weight via similarity correctly if 100% similair', () => {
      summaryBot._proccessString('hello hi. hi hello.')
      summaryBot._initialize()
      let otherVert = 1
      expect(summaryBot.vertexes[0].edge[1]).to.equal(2 / (2 * Math.log(2)))
    })
  })

  describe('_getEdgeTotals', function () {
    it('returns an array with one entry per vertex', function () {
      summaryBot._proccessString('hello hi. hi sad guy. hello I feel sad.')
      summaryBot._initialize()
      expect(summaryBot._getEdgeTotals().length).to.equal(3)
    })
  })

  describe('_sortVertexesByWeight', function () {
    it('should sort the vertexes descending by weight', function () {
      summaryBot._proccessString('hello my friend. im SO tired. jeez im sleepy.')
      summaryBot._sortVertexesByWeight()
      expect(summaryBot.vertexes[0].weight).to.be.greaterThan(summaryBot.vertexes[2].weight)
    })
  })
  describe('_updateAllVertexWeights', function () {
    it('works', function () {
      summaryBot._proccessString('In high school, I followed my interest in high fantasy to take a speculative fiction course. This is where I got a real exposure to science fiction. Titles like Lord of Light and The Martian captivated me in the same way that high fantasy did when I was younger. Nowadays, I generally consume a lot less media, whether it be in print or in video. However, when I decided to take a writing course, I knew that I wanted it to be inside the realm of speculative fiction. Looking through the descriptions of all the courses, the only one that really caught my eye was Jewish SF 2290W. Although I have a limited exposure to Jewish culture, I believed that I would have enough to still be able to contribute to the conversation. Entering into the course, I hope that its focus is more on the literary aspects of science fiction. I want us to spend more time focusing on the influences of the author’s past in the text. As such, I wish that we would get more insight into the author’s lives before we read each piece. So far, I’ve found our discussion about the biblical references in I Have No Mouth and I Must Scream to be the most engaging. I think the class would be even more engaging if discussions like that occurred with less guidance. I would prefer if the class was given a topic to discuss instead of a specific question. While that plan may not work given how much content we go through in a single 50-minute class, I think that students should be given a larger opportunity to lead the discussion. I’m excited for the coming semester, and if the first week has been any indication, this class will offer me a lot of insight into both Judaism and science fiction.')
      summaryBot._initialize()
      summaryBot._updateAllVertexWeights()
      summaryBot._updateAllVertexWeights()
      summaryBot._updateAllVertexWeights()
      summaryBot._updateAllVertexWeights()
      summaryBot._updateAllVertexWeights()
      summaryBot._updateAllVertexWeights()
      summaryBot._updateAllVertexWeights()
      summaryBot._updateAllVertexWeights()
      summaryBot._updateAllVertexWeights()
      summaryBot._updateAllVertexWeights()
      summaryBot._updateAllVertexWeights()
      summaryBot._updateAllVertexWeights()
      summaryBot._updateAllVertexWeights()
      summaryBot._updateAllVertexWeights()
      summaryBot._updateAllVertexWeights()
      summaryBot._updateAllVertexWeights()
      summaryBot._updateAllVertexWeights()
      summaryBot._updateAllVertexWeights()
      summaryBot._updateAllVertexWeights()
      summaryBot._updateAllVertexWeights()
      summaryBot._updateAllVertexWeights()
      summaryBot._updateAllVertexWeights()
      console.log(summaryBot.getTopSentences(3))

    })
  })
  describe('run3', function () {
    it('still doesnt work', function () {
      summaryBot.run('In high school, I followed my interest in high fantasy to take a speculative fiction course. This is where I got a real exposure to science fiction. Titles like Lord of Light and The Martian captivated me in the same way that high fantasy did when I was younger. Nowadays, I generally consume a lot less media, whether it be in print or in video. However, when I decided to take a writing course, I knew that I wanted it to be inside the realm of speculative fiction. Looking through the descriptions of all the courses, the only one that really caught my eye was Jewish SF 2290W. Although I have a limited exposure to Jewish culture, I believed that I would have enough to still be able to contribute to the conversation. Entering into the course, I hope that its focus is more on the literary aspects of science fiction. I want us to spend more time focusing on the influences of the author’s past in the text. As such, I wish that we would get more insight into the author’s lives before we read each piece. So far, I’ve found our discussion about the biblical references in I Have No Mouth and I Must Scream to be the most engaging. I think the class would be even more engaging if discussions like that occurred with less guidance. I would prefer if the class was given a topic to discuss instead of a specific question. While that plan may not work given how much content we go through in a single 50-minute class, I think that students should be given a larger opportunity to lead the discussion. I’m excited for the coming semester, and if the first week has been any indication, this class will offer me a lot of insight into both Judaism and science fiction.', 3)
    })
  })
  describe('run', function () {
    it('return the top setnences', function () {
      console.log(summaryBot.run('The calls — detailed by three senior White House officials — are part strategy consultation and part presidential venting session, during which Trump’s lawyers and public-relations gurus take turns reviewing the latest headlines with him. They also devise their plan for battling his avowed enemies: the special counsel leading the Russia investigation; the “fake news” media chronicling it; and, in some instances, the president’s own Justice Department overseeing the probe. His advisers have encouraged the calls — which the early-to-rise Trump takes from his private quarters in the White House residence — in hopes that he can compartmentalize the widening Russia investigation. By the time the president arrives for work in the Oval Office, the thinking goes, he will no longer be consumed by the Russia probe that he complains hangs over his presidency like a darkening cloud. It rarely works, however. Asked whether the tactic was effective, one top White House adviser paused for several seconds and then just laughed.Trump’s grievances and moods often bleed into one another. Frustration with the investigation stews inside him until it bubbles up in the form of rants to aides about unfair cable television commentary or as slights aimed at Attorney General Jeff Sessions and his deputy, Rod J. Rosenstein. President Trump listens during a demonstration at the American Leadership in Emerging Technology event in the East Room of the White House on June 22, 2017. (Jabin Botsford/The Washington Post) And, of course, it emerges in fiery tweets about the “WITCH HUNT” — or, as he wrote Thursday morning, shortly before an event promoting leadership in technology, “a big Dem HOAX!” The morning calls reflect another way that Trump’s tumultuous administration is adapting to an unremitting season of investigations and to the president’s seemingly uncontrollable reactions to them. Interviews with 22 senior administration officials, outside advisers, and Trump confidants and allies reveal a White House still trying, after five months of halting progress, to establish a steady rhythm of governance while also indulging and managing Trump’s combative and sometimes self-destructive impulses. The White House is laboring to prevent the Russia matter from overtaking its broader agenda, diligently rolling out a series of theme weeks, focusing on topics including infrastructure and workforce development. West Wing aides are working to keep the president on schedule, trotting him around the country in front of the supportive crowds that energize him. Trump is also planning several big announcements on trade in the coming weeks, before jetting off to Poland and Germany in early July. “This is not astrophysics,” chief strategist Stephen K. Bannon said. “You solidify your base and you grow your base by getting things done. That’s what people want to see.”[Inside Trump’s climate decision: After fiery debate, he ‘stayed where he’s always been’] Senior officials have also been devising an overhaul of the White House communications operation to better meet the offensive and defensive demands of the president they serve, as well as the 24-hour cycle of tweet-size news. “As his detractors suffer from this never-ending ‘Russian concussion,’ the president has been tending to business as usual — bilateral meetings, progress on health care, tax and infrastructure reform, and job creation,” said Kellyanne Conway, counselor to the president. “Conjecture about the mood and momentum of the West Wing is inaccurate and overwrought. The pace is breakneck, the trajectory upward.” White House Chief of Staff Reince Priebus walks out of the White House on June 1, 2017, to await President Trump’s remarks in the Rose Garden about the U.S. role in the Paris climate accord. (Jabin Botsford/The Washington Post) Inside and outside the White House, advisers and friends are also engaging in quiet, informal conversations about when it makes sense for embattled Chief of Staff Reince Priebus to step aside — and who his replacement should be. Some of Priebus’s most senior colleagues speak ill of his leadership abilities, with one tagging him “the most imperiled person here,” although others insist Priebus is in solid standing with the president.Some in the White House fret over what they view as the president’s fits of rage, and Trump’s longtime friends say his mood has been more sour than at any point since they have known him. They privately worry about his health, noting that he appears to have gained weight in recent months and that the darkness around his eyes reveals his stress. But others who interact with Trump each day have a more positive interpretation of his behavior, saying his mood is far sunnier than news reports would suggest. Hope Hicks, Trump’s director of strategic communications, who sits at a desk just outside the Oval Office, said the president is optimistic and expressing the fighting spirit that appeals to voters. Citing his 1987 book, “The Art of the Deal,” Hicks said, “Perhaps President Trump said it best many years ago when he wrote, ‘My general attitude all my life, has been to fight back very hard. . . . [A]s far as I’m concerned, if they had any real ability they wouldn’t be fighting me, they’d be doing something constructive themselves.’ The president promised the American people they elected a fighter and he embodies that with his instincts, spirit and energy.” Many Republicans observing from the outside, however, voice dismay about the president’s behavior. “What’s playing out is a psychological drama, not just a political drama or a legal drama,” said Peter Wehner, who was an aide in George W. Bush’s White House and has frequently been critical of Trump. “The president’s psychology is what’s driving so much of this, and it’s alarming because it shows a lack of self-control, a tremendous tropism. . . . He seems to draw psychic energy from creating chaos and disorder.” [Inside Trump’s anger and impatience — and his sudden decision to fire Comey] After Trump fired James B. Comey as FBI director in May and scrutiny over Russia intensified from investigators and journalists, the president and his inner circle settled on a combative strategy to discredit critics, undermine the probe itself and galvanize his most loyal supporters. The approach also put Bannon on firmer ground after a rocky patch just weeks earlier, in part because of feuds with Jared Kushner, the president’s son-in-law and senior adviser. Trump views Bannon as his wartime consigliere — the sort of political street fighter he wants as his presidency is threatened. “This is a train that’s coming,” said Roger Stone, a former Trump adviser and longtime confidant, referring to the investigation led by special counsel Robert S. Mueller III. “These guys are going to move on him despite the fact that they don’t have a case. The question on the table is what is he going to do about it, and that is a legal and political question.” Trump and his top aides have tried to partition the Russia matter away from official White House business. Although the president’s personal lawyers and communications strategists have counseled him and manage inquiries from the outside the White House, they nonetheless visit the West Wing for meetings and coordinate some matters with administration officials. There is disagreement within the Trump circle about how large the outside legal team should be. It currently is led by Marc E. Kasowitz, a New York-based lawyer who has worked with Trump off and on for several decades. Jay Sekulow, a Washington lawyer with deep ties to the Christian conservative movement, is the public face of the team. Some White House officials said they felt Sekulow got roughed up in a series of television interviews last Sunday, but noted that Trump admires Sekulow’s aggression and polished appearance.', 7))
    })
  })
})
