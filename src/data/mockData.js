// Prototype catalogue: editorial sample metadata and public artwork URLs, not a live feed.
export const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
export const durations = ['20–30 minutes','30–45 minutes','45–60 minutes','60–90 minutes','90+ minutes']
export const services = ['Spotify','Apple Podcasts','YouTube Music','Pocket Casts','Other']
export const interests = ['True Crime','News','Sports','Comedy','History','Science','Politics','Culture','Business','Technology','Interviews','Storytelling','Documentary','Personal Growth']
export const preferenceGroups = {
  styles: ['Standalone episodes','Ongoing series','Interviews','Panel discussions','Narrated stories','Investigative','Documentary','Conversational','Solo host'],
  tones: ['Serious','Funny','Relaxed','Fast-paced','Thoughtful','Dark','Uplifting','Informative'],
  depths: ['Quick overview','Detailed','Deep dive','Beginner-friendly','Expert-level'],
}
export const episodeSelections = ['Keep me current','Start from the beginning','Best episodes','Mix recent and older']

const art = [
  'https://is1-ssl.mzstatic.com/image/thumb/Podcasts221/v4/d8/45/24/d84524f9-4c7c-70f2-cd79-c1a35a5b01c7/mza_13395761927869878468.jpg/600x600bb.jpg',
  'https://is1-ssl.mzstatic.com/image/thumb/Podcasts211/v4/45/7f/7a/457f7a08-957e-4e8f-133f-10c65578fa3b/mza_13316881474246641548.jpg/600x600bb.jpg',
  'https://is1-ssl.mzstatic.com/image/thumb/Podcasts221/v4/58/91/2d/58912d11-3e99-1e7b-cd09-a793431375f2/mza_17207353415333775507.jpg/600x600bb.jpg',
  'https://is1-ssl.mzstatic.com/image/thumb/Podcasts211/v4/f3/d9/6f/f3d96f13-c4f6-3192-f46c-fec44f5a0f87/mza_12447427873011078340.jpg/600x600bb.jpg',
  'https://is1-ssl.mzstatic.com/image/thumb/Podcasts126/v4/09/91/89/099189be-56a3-a709-9b52-18e77656cab8/mza_16065875582244438356.jpg/600x600bb.jpg',
  'https://is1-ssl.mzstatic.com/image/thumb/Podcasts221/v4/24/10/ef/2410ef45-782f-e12d-3c27-3483fe07a555/mza_619436314033869869.jpg/600x600bb.jpg',
]
const linkSet = query => ({
  externalUrl:`https://www.google.com/search?q=${encodeURIComponent(query+' podcast')}`,
  spotifyUrl:`https://open.spotify.com/search/${encodeURIComponent(query)}`,
  appleUrl:`https://podcasts.apple.com/us/search?term=${encodeURIComponent(query)}`,
  youtubeMusicUrl:`https://music.youtube.com/search?q=${encodeURIComponent(query)}`,
  pocketCastsUrl:`https://pca.st/search/${encodeURIComponent(query)}`,
})
const raw = [
 ['The Daily','What the New Economy Looks Like',31,'2026-07-27',['News','Politics'],'Interviews','Informative','Detailed',false,false,'Latest release'],
 ['Science Vs','Sleep: The Science of a Better Night',38,'2026-07-25',['Science','Personal Growth'],'Documentary','Thoughtful','Detailed',false,false,'Best match'],
 ['99% Invisible','The City Beneath the City',43,'2026-07-23',['Culture','History'],'Narrated stories','Relaxed','Deep dive',false,false,'Fits your time'],
 ['SmartLess','Stories, Work and the Long Way Around',51,'2026-07-24',['Comedy','Interviews'],'Interviews','Funny','Quick overview',false,false,'From your favourites'],
 ['The Rest Is History','The Week That Changed an Empire',62,'2026-07-20',['History'],'Conversational','Thoughtful','Deep dive',true,false,'Best match'],
 ['Criminal','The Vanishing at Mile Marker 12',35,'2026-07-26',['True Crime','Storytelling'],'Investigative','Serious','Detailed',false,false,'Latest release'],
 ['Hard Fork','The Small Models Taking Over',48,'2026-07-25',['Technology','Business'],'Panel discussions','Fast-paced','Detailed',false,false,'Something different'],
 ['Radiolab','The Memory Palace in Your Brain',54,'2022-10-14',['Science','Storytelling'],'Documentary','Thoughtful','Deep dive',false,true,'From the archive'],
 ['Planet Money','Why Everything Costs What It Costs',27,'2026-07-24',['Business','News'],'Standalone episodes','Informative','Quick overview',false,false,'Fits your time'],
 ['Conan O’Brien Needs a Friend','A Very Serious Conversation',58,'2026-07-21',['Comedy','Interviews'],'Interviews','Funny','Quick overview',false,false,'Something different'],
]
export const episodes = raw.map((e,i) => ({id:`episode-${i+1}`,podcastName:e[0],episodeTitle:e[1],artworkUrl:art[i%art.length],episodeArtworkUrl:art[i%art.length],durationMinutes:e[2],releaseDate:e[3],description:'A prototype episode selected to demonstrate Podstack’s weekly planning experience.',tags:[e[11]],interests:e[4],format:e[5],tone:e[6],depth:e[7],isSerialized:e[8],episodeNumber:e[8]?1:null,seasonNumber:e[8]?1:null,isArchive:e[9],selectionReason:e[10],...linkSet(`${e[0]} ${e[1]}`)}))

export const initialDays = {Monday:'30–45 minutes',Tuesday:'45–60 minutes',Wednesday:'30–45 minutes',Thursday:'45–60 minutes',Friday:'30–45 minutes'}
export function buildStack(selectedDays=initialDays, offset=0) {
 return days.map((day,index)=> selectedDays[day] ? {...episodes[(index+offset)%7],slotId:`${day.toLowerCase()}-slot`,day,window:selectedDays[day],status:'planned'} : null).filter(Boolean)
}
export const alternates = episodes.slice(4).map((e,i)=>({...e,id:`alternate-${i}`}))
export const discoveries = episodes.slice(2,8)

const readyInfo = [
 ['True Crime Week','Carefully paced investigations for your weekday routine.',['Monday','Wednesday','Friday'],'2 hr 10 min','Investigative'],
 ['The Sports Rundown','Scores, stories and smart analysis without the scroll.',['Monday','Thursday','Saturday'],'2 hr 35 min','Fast-paced'],
 ['Smart Conversations','Ideas worth carrying into the rest of your week.',['Tuesday','Thursday'],'1 hr 40 min','Thoughtful'],
 ['Daily News Catch-Up','A concise, current briefing for every weekday.',['Monday','Tuesday','Wednesday','Thursday','Friday'],'2 hr 30 min','Informative'],
 ['Weekend Deep Dives','Long-form stories for unhurried listening.',['Saturday','Sunday'],'2 hr 45 min','Deep dive'],
 ['Comedy Commute','Lighter listens for the trip there and back.',['Monday','Wednesday','Friday'],'2 hr 20 min','Funny'],
 ['History in Five','Five chapters from the past, planned for now.',['Monday','Tuesday','Wednesday','Thursday','Friday'],'3 hr 20 min','Narrated'],
 ['Culture Catch-Up','The conversations shaping film, music and ideas.',['Tuesday','Thursday','Saturday'],'2 hr 15 min','Conversational'],
]
export const readyStacks = readyInfo.map((r,i)=>({id:`ready-${i}`,title:r[0],description:r[1],days:r[2],duration:r[3],mood:r[4],examples:[episodes[i%episodes.length],episodes[(i+2)%episodes.length],episodes[(i+4)%episodes.length]]}))

export const defaultState = {selectedDays:initialDays,interests:['News','Science','Culture'],styles:[],tones:['Thoughtful'],depths:[],episodeSelection:'Keep me current',service:'Spotify',stack:buildStack(),alternates,swaps:[],listened:[],skipped:[],saved:[],nextWeek:[],onboardingComplete:false}
