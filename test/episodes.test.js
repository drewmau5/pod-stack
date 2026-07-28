import test from 'node:test'
import assert from 'node:assert/strict'
import { chooseEpisodeForSlot, parseDuration, sortEpisodesNewestFirst } from '../src/utils/episodes.js'
import { normalizeFeed, validateFeedUrl } from '../api/_lib/feed.js'
import { normalizeChart } from '../api/_lib/appleCharts.js'
import { migrateState } from '../src/utils/persistence.js'
import { planStack, scoreEpisode } from '../src/data/catalogue.js'
test('parses common RSS durations',()=>{assert.deepEqual(parseDuration('1:02:30'),{durationSeconds:3750,durationMinutes:63});assert.equal(parseDuration('').durationMinutes,null)})
test('migrates legacy duration windows to simple selected days',()=>assert.deepEqual(migrateState({selectedDays:{Monday:'45–60 minutes',Tuesday:{targetMinutes:20},Wednesday:false}}).selectedDays,{Monday:true,Tuesday:true}))
test('sorts episodes newest first',()=>assert.equal(sortEpisodesNewestFirst([{id:1,releaseDate:'2024-01-01'},{id:2,releaseDate:'2025-01-01'}])[0].id,2))
test('duration has no scoring effect',()=>assert.equal(chooseEpisodeForSlot([{id:'long',durationMinutes:180,interests:['News']},{id:'short',durationMinutes:5,interests:[]}],{}, {interests:['News']}).id,'long'))
test('normalizes RSS',()=>{const data=normalizeFeed({title:'Show',items:[{title:'Episode',guid:'g',pubDate:'2025-01-01',itunes:{duration:'47:00'}}]},'https://example.com/feed');assert.equal(data.episodes[0].durationMinutes,47);assert.equal(data.show.feedUrl,'https://example.com/feed')})
test('rejects unsafe URLs',async()=>{await assert.rejects(validateFeedUrl('http://127.0.0.1/rss'));await assert.rejects(validateFeedUrl('file:///tmp/feed'))})
test('normalizes ten usable Canadian chart rows',()=>{const data={feed:{results:Array.from({length:10},(_,i)=>({id:String(i+1),name:`Show ${i}`,artistName:'Host',url:`https://podcasts.apple.com/${i}`,genres:[]}))}};const result=normalizeChart(data,'ca',10,'now');assert.equal(result.length,10);assert.equal(result[0].rank,1);assert.equal(result[0].chartCountry,'ca')})
test('selected podcasts receive strongest priority and stack diversifies',()=>{const episodes=[{id:'a',guid:'a',podcastId:'fav',selectedPodcast:true,releaseDate:new Date().toISOString(),interests:[]},{id:'b',guid:'b',podcastId:'other',releaseDate:new Date().toISOString(),interests:['News']}];assert.ok(scoreEpisode(episodes[0],{interests:['News']})>scoreEpisode(episodes[1],{interests:['News']}));assert.equal(planStack(episodes,{Monday:true,Tuesday:true},{interests:['News']}).stack.length,2)})
