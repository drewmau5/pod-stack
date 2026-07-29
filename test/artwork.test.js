import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { artworkIdentityKey, isUsableArtworkUrl, nextArtworkAfterError, normalizeArtworkFields, normalizeFeedUrl, PODSTACK_ARTWORK_FALLBACK, resolveEpisodeArtwork, resolveShowArtwork } from '../src/utils/artwork.js'

const apple='https://is1-ssl.mzstatic.com/image/thumb/show.jpg'
const rss='https://publisher.example/show.jpg'
const episode='https://publisher.example/episodes/42.jpg'

test('episode-specific artwork wins on episode records',()=>assert.deepEqual(resolveEpisodeArtwork({episodeArtworkUrl:episode,rssShowArtworkUrl:rss}),{url:episode,source:'rss-episode'}))
test('show artwork is used when episode art is absent',()=>assert.deepEqual(resolveEpisodeArtwork({episodeArtworkUrl:null,rssShowArtworkUrl:rss}),{url:rss,source:'rss-channel'}))
test('Apple art wins only when its collection identity matches',()=>{assert.equal(resolveShowArtwork({appleCollectionId:'1',appleArtworkCollectionId:'1',appleShowArtworkUrl:apple,rssShowArtworkUrl:rss}).url,apple);assert.equal(resolveShowArtwork({appleCollectionId:'1',appleArtworkCollectionId:'2',appleShowArtworkUrl:apple,rssShowArtworkUrl:rss}).url,rss)})
test('RSS channel artwork is used without Apple artwork',()=>assert.equal(resolveShowArtwork({feedUrl:'https://example.com/feed',rssShowArtworkUrl:rss}).url,rss))
test('invalid, tracking, and legacy placeholder artwork URLs are rejected',()=>{for(const value of ['',null,'javascript:alert(1)','https://x.test/1x1.gif','/sample-artwork/criminal.svg'])assert.equal(isUsableArtworkUrl(value),false)})
test('fallback appears only when no valid real artwork exists',()=>{assert.equal(resolveShowArtwork({rssShowArtworkUrl:rss}).url,rss);assert.equal(resolveShowArtwork({rssShowArtworkUrl:'bad'}).url,PODSTACK_ARTWORK_FALLBACK)})
test('similar titles with different feeds retain distinct artwork identities',()=>{const a={title:'The Daily',author:'Publisher',feedUrl:'HTTPS://A.example/feed/',rssShowArtworkUrl:'https://a.example/art.jpg'};const b={title:'The Daily',author:'Publisher',feedUrl:'https://b.example/feed',rssShowArtworkUrl:'https://b.example/art.jpg'};assert.notEqual(artworkIdentityKey(a),artworkIdentityKey(b));assert.notEqual(normalizeArtworkFields(a,{kind:'show'}).displayArtworkUrl,normalizeArtworkFields(b,{kind:'show'}).displayArtworkUrl)})
test('failed image fallback can be selected exactly once',()=>{const first=nextArtworkAfterError(false);assert.equal(first.displayArtworkUrl,PODSTACK_ARTWORK_FALLBACK);assert.equal(first.fallbackUsed,true);assert.equal(nextArtworkAfterError(first.fallbackUsed),null)})
test('all product surfaces render through the shared Artwork component',()=>{const app=fs.readFileSync(new URL('../src/App.jsx',import.meta.url),'utf8');const brand=fs.readFileSync(new URL('../src/components/brand/Brand.jsx',import.meta.url),'utf8');assert.match(app,/function Landing[\s\S]*<Artwork/);assert.match(app,/function StackExperience[\s\S]*<Artwork/);assert.match(app,/function Discover[\s\S]*<Artwork/);assert.match(brand,/PaperLayers[\s\S]*<Artwork/)})
test('existing canonical real artwork is never replaced by sample artwork',()=>{const item=normalizeArtworkFields({podcastId:'real',feedUrl:'https://example.com/feed',rssShowArtworkUrl:rss,artworkUrl:'/sample-artwork/criminal.svg'},{kind:'show'});assert.equal(item.displayArtworkUrl,rss);assert.notEqual(item.displayArtworkUrl,'/sample-artwork/criminal.svg')})
test('feed URL normalization preserves queries and distinct feeds',()=>{assert.equal(normalizeFeedUrl(' HTTPS://Example.COM/feed/ '),'https://example.com/feed');assert.notEqual(normalizeFeedUrl('https://example.com/feed?a=1'),normalizeFeedUrl('https://example.com/feed?a=2'))})
