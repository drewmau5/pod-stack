// Prototype catalogue: editorial sample metadata and public artwork URLs, not a live feed.
export const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
export const services = ['Spotify','Apple Podcasts','YouTube Music','Pocket Casts','Other']
export const interests = ['True Crime','News','Sports','Comedy','History','Science','Politics','Culture','Business','Technology','Interviews','Storytelling','Documentary','Personal Growth']
export const preferenceGroups = {
  styles: ['Standalone episodes','Ongoing series','Interviews','Panel discussions','Narrated stories','Investigative','Documentary','Conversational','Solo host'],
  tones: ['Serious','Funny','Relaxed','Fast-paced','Thoughtful','Dark','Uplifting','Informative'],
  depths: ['Quick overview','Detailed','Deep dive','Beginner-friendly','Expert-level'],
}
export const episodeSelections = ['Keep me current','Start from the beginning','Best episodes','Mix recent and older']

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
 ['99% Invisible','The City Beneath the City',43,'2026-07-23',['Culture','History'],'Narrated stories','Relaxed','Deep dive',false,false,'Chosen for variety'],
 ['SmartLess','Stories, Work and the Long Way Around',51,'2026-07-24',['Comedy','Interviews'],'Interviews','Funny','Quick overview',false,false,'From your favourites'],
 ['The Rest Is History','The Week That Changed an Empire',62,'2026-07-20',['History'],'Conversational','Thoughtful','Deep dive',true,false,'Best match'],
 ['Criminal','The Vanishing at Mile Marker 12',35,'2026-07-26',['True Crime','Storytelling'],'Investigative','Serious','Detailed',false,false,'Latest release'],
 ['Hard Fork','The Small Models Taking Over',48,'2026-07-25',['Technology','Business'],'Panel discussions','Fast-paced','Detailed',false,false,'Something different'],
 ['Radiolab','The Memory Palace in Your Brain',54,'2022-10-14',['Science','Storytelling'],'Documentary','Thoughtful','Deep dive',false,true,'From the archive'],
 ['Planet Money','Why Everything Costs What It Costs',27,'2026-07-24',['Business','News'],'Standalone episodes','Informative','Quick overview',false,false,'New this week'],
 ['Conan O’Brien Needs a Friend','A Very Serious Conversation',58,'2026-07-21',['Comedy','Interviews'],'Interviews','Funny','Quick overview',false,false,'Something different'],
]
export const episodes = raw.map((e,i) => ({id:`episode-${i+1}`,podcastId:`sample-${e[0]}`,podcastName:e[0],episodeTitle:e[1],showArtworkUrl:null,episodeArtworkUrl:null,displayArtworkUrl:'/podstack-artwork.svg',artworkSource:'podstack-fallback',durationMinutes:e[2],releaseDate:e[3],description:'A prototype episode selected to demonstrate Podstack’s weekly planning experience.',tags:[e[11]],interests:e[4],format:e[5],tone:e[6],depth:e[7],isSerialized:e[8],episodeNumber:e[8]?1:null,seasonNumber:e[8]?1:null,isArchive:e[9],selectionReason:e[10],...linkSet(`${e[0]} ${e[1]}`)}))
