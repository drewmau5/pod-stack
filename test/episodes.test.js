import test from 'node:test'
import assert from 'node:assert/strict'
import { chooseEpisodeForSlot, normalizeDurationPreference, parseDuration, sortEpisodesNewestFirst } from '../src/utils/episodes.js'
import { normalizeFeed, validateFeedUrl } from '../api/_lib/feed.js'
test('parses common RSS durations',()=>{assert.deepEqual(parseDuration('1:02:30'),{durationSeconds:3750,durationMinutes:63});assert.equal(parseDuration('').durationMinutes,null)})
test('migrates legacy duration windows',()=>assert.deepEqual(normalizeDurationPreference('45–60 minutes'),{targetMinutes:53,flexibility:'balanced'}))
test('sorts episodes newest first',()=>assert.equal(sortEpisodesNewestFirst([{id:1,releaseDate:'2024-01-01'},{id:2,releaseDate:'2025-01-01'}])[0].id,2))
test('duration is scored, not excluded',()=>assert.equal(chooseEpisodeForSlot([{id:'relevant',durationMinutes:80,interests:['News']},{id:'exact',durationMinutes:60,interests:['Comedy']}],{targetMinutes:60,flexibility:'flexible'},{interests:['News']}).id,'relevant'))
test('normalizes RSS',()=>{const data=normalizeFeed({title:'Show',items:[{title:'Episode',guid:'g',pubDate:'2025-01-01',itunes:{duration:'47:00'}}]},'https://example.com/feed');assert.equal(data.episodes[0].durationMinutes,47);assert.equal(data.show.feedUrl,'https://example.com/feed')})
test('rejects unsafe URLs',async()=>{await assert.rejects(validateFeedUrl('http://127.0.0.1/rss'));await assert.rejects(validateFeedUrl('file:///tmp/feed'))})
