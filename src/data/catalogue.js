import { fetchPodcastFeed, searchPodcasts } from '../services/podcastApi.js'
import { episodes as sampleEpisodes } from './mockData.js'
import { artworkIdentityKey, normalizeArtworkFields } from '../utils/artwork.js'

export const curatedSources = [
 {id:'crime-junkie',appleCollectionId:'1322200189',title:'Crime Junkie',author:'audiochuck',feedUrl:'https://feeds.megaphone.fm/ADL9840290619',appleUrl:'https://podcasts.apple.com/ca/podcast/crime-junkie/id1322200189',interests:['True Crime'],format:['Standalone episodes','Investigative'],tone:['Serious']},
 {id:'dateline',appleCollectionId:'1464919521',title:'Dateline NBC',author:'NBC News',feedUrl:'https://podcastfeeds.nbcnews.com/dateline-nbc',appleUrl:'https://podcasts.apple.com/ca/podcast/dateline-nbc/id1464919521',interests:['True Crime','News'],format:['Investigative'],tone:['Serious','Informative']},
 {id:'daily',appleCollectionId:'1200361736',title:'The Daily',author:'The New York Times',feedUrl:'https://feeds.simplecast.com/54nAGcIl',appleUrl:'https://podcasts.apple.com/ca/podcast/the-daily/id1200361736',interests:['News','Politics'],format:['Interviews'],tone:['Informative']},
 {id:'science-vs',title:'Science Vs',author:'Spotify Studios',feedUrl:'https://feeds.megaphone.fm/sciencevs',interests:['Science'],format:['Documentary'],depth:['Detailed']},
 {id:'99pi',title:'99% Invisible',author:'Roman Mars',feedUrl:'https://feeds.simplecast.com/BqbsxVfO',interests:['History','Culture','Documentary'],format:['Narrated stories'],depth:['Deep dive']},
 {id:'criminal',appleCollectionId:'809264944',title:'Criminal',author:'Vox Media Podcast Network',feedUrl:'https://feeds.megaphone.fm/VMP7924981569',appleUrl:'https://podcasts.apple.com/ca/podcast/criminal/id809264944',interests:['True Crime','Storytelling'],format:['Investigative','Narrated stories'],tone:['Serious']},
 {id:'rest-is-history',appleCollectionId:'1537788786',title:'The Rest Is History',author:'Goalhanger',feedUrl:'https://feeds.megaphone.fm/GLT4787413333',appleUrl:'https://podcasts.apple.com/ca/podcast/the-rest-is-history/id1537788786',interests:['History'],format:['Conversational'],tone:['Thoughtful']},
]
export const readyStacks = [
 {id:'crime',title:'Crime & History Week',description:'Distinct investigations and stories for five listening days.',days:['Monday','Tuesday','Wednesday','Thursday','Friday'],interests:['True Crime','History'],styles:['Investigative','Standalone episodes'],tones:['Serious'],depths:[],sourceIds:['crime-junkie','dateline','criminal','rest-is-history','99pi'],episodeSelection:'Keep me current'},
 {id:'news',title:'Daily News Catch-Up',description:'An informative current briefing for every weekday.',days:['Monday','Tuesday','Wednesday','Thursday','Friday'],interests:['News'],styles:[],tones:['Informative'],depths:[],sourceIds:['daily','dateline'],episodeSelection:'Keep me current'},
 {id:'deep',title:'Weekend Deep Dives',description:'Documentary, history and science for the weekend.',days:['Saturday','Sunday'],interests:['Documentary','History','Science'],styles:['Documentary'],tones:['Thoughtful'],depths:['Deep dive'],sourceIds:['science-vs','99pi'],episodeSelection:'Keep me current'},
]
const key = x => x.guid || x.id || `${x.feedUrl}:${x.episodeTitle}`
export function normalizeEpisode(ep, source, preferences={}) {
 const age=(Date.now()-new Date(ep.releaseDate||0).getTime())/86400000
 const podcastName=ep.podcastName||source.title
 const searchName=encodeURIComponent(podcastName)
 const merged={...ep,sourceType:'rss',podcastId:String(source.id),podcastGuid:ep.podcastGuid||source.podcastGuid||null,appleCollectionId:source.appleCollectionId||ep.appleCollectionId||null,feedUrl:ep.feedUrl||source.feedUrl,guid:ep.guid||ep.id,podcastName,podcastAuthor:source.author||ep.podcastAuthor||'',appleShowArtworkUrl:source.appleShowArtworkUrl||ep.appleShowArtworkUrl||null,appleArtworkCollectionId:source.appleArtworkCollectionId||ep.appleArtworkCollectionId||null,rssShowArtworkUrl:ep.rssShowArtworkUrl||source.rssShowArtworkUrl||null,showArtworkUrl:ep.showArtworkUrl||source.showArtworkUrl||null,showArtworkSource:ep.showArtworkSource||source.showArtworkSource||null,episodeArtworkUrl:ep.episodeArtworkUrl||null,webpageUrl:ep.webpageUrl||null,appleUrl:ep.appleUrl||source.appleUrl||null,spotifyUrl:ep.spotifyUrl||source.spotifyUrl||`https://open.spotify.com/search/${searchName}`,spotifyUrlType:ep.spotifyUrl||source.spotifyUrl?'direct':'search',youtubeMusicUrl:ep.youtubeMusicUrl||source.youtubeMusicUrl||`https://music.youtube.com/search?q=${searchName}`,youtubeMusicUrlType:ep.youtubeMusicUrl||source.youtubeMusicUrl?'direct':'search',interests:source.interests||source.genres||[],format:source.format||[],tone:source.tone||[],depth:source.depth||[],isArchive:age>30,isSerialized:Boolean(ep.seasonNumber||ep.episodeNumber&&ep.episodeType!=='full'),episodeNumber:ep.episodeNumber||null,seasonNumber:ep.seasonNumber||null,selectedPodcast:Boolean(preferences.selectedIds?.has(String(source.id)))}
 merged.showArtworkIdentityKey=artworkIdentityKey(merged)
 return normalizeArtworkFields(merged,{kind:'episode'})
}
export function scoreEpisode(ep,prefs={}) { let score=0; if(ep.selectedPodcast)score+=1000; score+=(ep.interests||[]).filter(x=>prefs.interests?.includes(x)).length*120; const age=Math.max(0,(Date.now()-new Date(ep.releaseDate||0).getTime())/86400000); score+=Math.max(0,160-age*5); if(prefs.episodeSelection==='Keep me current'&&age<=14)score+=180; for(const [field,selected] of [['format',prefs.styles],['tone',prefs.tones],['depth',prefs.depths]])score+=(ep[field]||[]).filter(x=>selected?.includes(x)).length*25; if(ep.isArchive)score-=prefs.episodeSelection==='Mix recent and older'?0:50; if(ep.isSerialized&&ep.episodeNumber>1)score-=120; return score }
export function podcastKey(episode = {}) {
 const name=String(episode.podcastName||episode.title||'').trim().toLocaleLowerCase().replace(/[^a-z0-9]+/g,' ').trim()
 return String(episode.podcastId||episode.feedUrl||name)
}
export function planStack(episodes,days,prefs={}) {
 const ranked=[...episodes].sort((a,b)=>scoreEpisode(b,prefs)-scoreEpisode(a,prefs)); const usedEpisodes=new Set(), usedShows=new Map(), stack=[]
 const selectedDays=Object.keys(days).filter(x=>days[x]); const distinctShows=new Set(ranked.map(podcastKey)).size
 const singleShowException=distinctShows===1&&prefs.selectedPodcasts?.length===1&&!prefs.interests?.length
 for(const day of selectedDays) {
  const eligible=ranked.filter(x=>!usedEpisodes.has(key(x)))
  let pool=eligible.filter(x=>!usedShows.has(podcastKey(x)))
  if(!pool.length) pool=eligible.filter(x=>singleShowException||(usedShows.get(podcastKey(x))||0)<2)
  const previous=stack.at(-1); pool.sort((a,b)=>{const adjusted=x=>scoreEpisode(x,prefs)-(usedShows.get(podcastKey(x))||0)*10000-(previous&&podcastKey(previous)===podcastKey(x)?2500:0);return adjusted(b)-adjusted(a)})
  const choice=pool[0]; if(!choice)break
  usedEpisodes.add(key(choice));usedShows.set(podcastKey(choice),(usedShows.get(podcastKey(choice))||0)+1)
  const age=(Date.now()-new Date(choice.releaseDate||0).getTime())/86400000
  stack.push({...choice,day,slotId:`${day.toLowerCase()}-${choice.id}`,status:'planned',selectionReason:choice.selectedPodcast?'From a favourite':age<=7?'New this week':choice.isArchive?'From the archive':choice.interests?.find(x=>prefs.interests?.includes(x))?`Matches ${choice.interests.find(x=>prefs.interests.includes(x))}`:'Chosen for variety'})
 }
 const weeklyShows=new Set(stack.map(podcastKey))
 const alternates=ranked.filter(x=>!usedEpisodes.has(key(x))).sort((a,b)=>Number(weeklyShows.has(podcastKey(a)))-Number(weeklyShows.has(podcastKey(b)))||scoreEpisode(b,prefs)-scoreEpisode(a,prefs)).slice(0,20)
 return {stack,alternates}
}
export async function buildRealCatalogue({selectedPodcasts=[],interests=[],extraSources=[]},feedLimit=15) {
 const selectedIds=new Set(selectedPodcasts.map(x=>String(x.id))); const wanted=curatedSources.filter(x=>x.interests.some(i=>interests.includes(i))); let sources=[...selectedPodcasts.map(x=>({...x,interests:x.genres||[]})),...wanted,...extraSources]; const unique=new Map(sources.filter(x=>x.feedUrl).map(x=>[x.feedUrl,x]));
 // Chart items can occasionally lack feedUrl: resolve selected items through Apple search before giving up.
 for(const show of sources.filter(x=>!x.feedUrl)) { try { const matches=await searchPodcasts(show.title); const match=matches.find(x=>x.id===show.id)||matches[0]; if(match?.feedUrl)unique.set(match.feedUrl,{...show,...match}) } catch { /* Unresolved chart shows are safely skipped. */ } }
 const settled=await Promise.allSettled([...unique.values()].map(async source=>({source,data:await fetchPodcastFeed(source.feedUrl)}))); const failures=[]; const episodes=[]; settled.forEach((result,index)=>{if(result.status==='fulfilled')episodes.push(...result.value.data.episodes.slice(0,feedLimit).map(ep=>normalizeEpisode(ep,result.value.source,{selectedIds})));else failures.push({source:[...unique.values()][index]?.title,error:result.reason?.message})});
 return {episodes:[...new Map(episodes.map(x=>[key(x),x])).values()],failures,sourceCount:unique.size,successfulSourceCount:settled.length-failures.length}
}
export const fallbackSampleEpisodes=sampleEpisodes.map(x=>normalizeArtworkFields({...x,sourceType:'sample-fallback',feedUrl:null,guid:x.id,podcastId:`sample-${x.podcastName}`,episodeArtworkUrl:null,showArtworkUrl:null,webpageUrl:x.externalUrl,format:[x.format].filter(Boolean),tone:[x.tone].filter(Boolean),depth:[x.depth].filter(Boolean)},{kind:'episode'}))
