import { useState } from 'react'
import {
  Apple, ArrowRight, Check, ChevronDown, CirclePlus, Clock3, Headphones,
  Home, Library, MoreHorizontal, Play, Plus, Search, Settings2,
  SlidersHorizontal, Sparkles, Star,
} from 'lucide-react'

const episodes = [
  { day: 'MON', date: '14', title: 'MYSTERIOUS DEATH OF: Bethany Decker', show: 'Crime Junkie', time: '52 min', art: 'junkie', badge: 'NEW' },
  { day: 'TUE', date: '15', title: 'The Good Soldier', show: 'Dateline NBC', time: '44 min', art: 'date', badge: 'NEW' },
  { day: 'WED', date: '16', title: 'The Vanishing at Lake Lanier', show: 'Park Predators', time: '38 min', art: 'park', badge: 'FOR YOU' },
  { day: 'THU', date: '17', title: 'Death on the Towpath', show: 'Casefile True Crime', time: '1 hr 12 min', art: 'case', badge: 'FOR YOU' },
  { day: 'FRI', date: '18', title: 'The Thing About Pam — Part 1', show: 'Dateline NBC', time: '41 min', art: 'date', badge: 'SAVED' },
]

const suggestions = [
  { title: 'Anatomy of Murder', desc: 'A murder case told by those who know it best.', meta: 'Wednesdays · 45 min', score: '96%', art: 'anatomy', rank: '#12 True Crime' },
  { title: 'CounterClock', desc: 'Investigative journalism that turns back the clock.', meta: 'Seasonal · 38 min', score: '92%', art: 'counter', rank: 'Listeners also love' },
  { title: 'The Deck', desc: 'Cold cases told through the clues left behind.', meta: 'Wednesdays · 35 min', score: '89%', art: 'deck', rank: 'Rising this week' },
]

function Cover({ type, small = false }) {
  return <div className={`cover ${type} ${small ? 'small' : ''}`} aria-label={`${type} podcast cover`}>
    {type === 'junkie' && <><b>crime<br/>junkie</b><span>audiochuck</span></>}
    {type === 'date' && <><i>DATELINE</i><b>NBC</b></>}
    {type === 'park' && <><span>PARK</span><b>PREDATORS</b></>}
    {type === 'case' && <><span>CASEFILE</span><b>TRUE CRIME</b></>}
    {type === 'anatomy' && <><b>ANATOMY<br/>OF MURDER</b><span>audiochuck</span></>}
    {type === 'counter' && <><span>SEASON 7</span><b>COUNTER<br/>CLOCK</b></>}
    {type === 'deck' && <><span>THE</span><b>DECK</b><i>INVESTIGATES</i></>}
  </div>
}

function Nav({ view, setView }) {
  return <nav className="topnav">
    <button className="brand" onClick={() => setView('home')}><span className="brandmark"><span/><span/><span/><span/></span>podstack</button>
    <div className="navlinks">
      <button className={view === 'home' ? 'active' : ''} onClick={() => setView('home')}>Home</button>
      <button className={view === 'discover' ? 'active' : ''} onClick={() => setView('discover')}>Discover</button>
      <button className={view === 'library' ? 'active' : ''} onClick={() => setView('library')}>My library</button>
    </div>
    <div className="navactions">
      <button className="iconBtn" aria-label="Search"><Search size={20}/></button>
      <button className="tuneBtn" onClick={() => setView('preferences')}><SlidersHorizontal size={18}/> Tune my stack</button>
      <button className="avatar">AM</button>
    </div>
  </nav>
}

function WeekCard({ episode, index, onReplace }) {
  const [done, setDone] = useState(false)
  return <article className={`weekcard ${done ? 'done' : ''}`}>
    <div className="date"><b>{episode.day}</b><span>{episode.date}</span></div>
    <Cover type={episode.art} small />
    <div className="epinfo">
      <div className="badgerow"><span className={`badge ${episode.badge.toLowerCase().replace(' ', '')}`}>{episode.badge}</span></div>
      <h3>{episode.title}</h3>
      <p>{episode.show} <span>·</span> {episode.time}</p>
    </div>
    <div className="cardactions">
      <button className="play" onClick={() => setDone(!done)} aria-label={done ? 'Mark unplayed' : 'Play episode'}>{done ? <Check/> : <Play fill="currentColor"/>}</button>
      <button className="more" onClick={() => onReplace(index)} aria-label="Episode options"><MoreHorizontal/></button>
    </div>
  </article>
}

function HomeView({ setView }) {
  const [week, setWeek] = useState(episodes)
  const [notice, setNotice] = useState('')
  const replace = (index) => {
    const replacement = { day: week[index].day, date: week[index].date, title: 'A Killing on the Cape', show: '48 Hours', time: '46 min', art: 'case', badge: 'SWAPPED' }
    setWeek(week.map((item, i) => i === index ? replacement : item))
    setNotice(`${week[index].day}'s episode was swapped.`)
    setTimeout(() => setNotice(''), 2200)
  }
  return <main>
    {notice && <div className="toast"><Check size={17}/>{notice}</div>}
    <section className="hero wrap">
      <div><p className="eyebrow"><Sparkles size={15}/> YOUR PERSONAL LISTENING PLAN</p><h1>Your week,<br/><em>well listened.</em></h1><p className="intro">Five commutes. Five stories. Zero time spent searching.</p></div>
      <div className="hero-meta">
        <div><span>THIS WEEK</span><strong>3 hr 47 min</strong></div>
        <div><span>YOUR GOAL</span><strong>5 episodes</strong></div>
        <div className="progress"><i style={{width:'80%'}}/></div>
        <small>Perfect fit for your weekday drives</small>
      </div>
    </section>

    <section className="weeksection wrap">
      <div className="sectionhead"><div><h2>Your weekday stack</h2><p>True crime · 40–90 min · Ready by 7:30 AM</p></div><button className="textBtn" onClick={() => setView('preferences')}><Settings2 size={17}/> Edit preferences</button></div>
      <div className="weeklist">{week.map((ep, i) => <WeekCard episode={ep} index={i} key={ep.day} onReplace={replace}/>)}</div>
      <button className="addday"><CirclePlus size={19}/> Add a weekend listen</button>
    </section>

    <section className="why wrap">
      <div><span className="kicker">BUILT AROUND YOU</span><h2>Why this stack works</h2></div>
      <div className="reason"><div className="reasonicon"><Clock3/></div><div><b>Fits your drive</b><p>Every episode is between 38 and 72 minutes.</p></div></div>
      <div className="reason"><div className="reasonicon"><Star/></div><div><b>Fresh, not random</b><p>3 new releases, 2 picks based on your taste.</p></div></div>
      <div className="reason"><div className="reasonicon"><Check/></div><div><b>No repeats</b><p>We’ve skipped everything you’ve already heard.</p></div></div>
    </section>

    <section className="discover wrap">
      <div className="sectionhead"><div><span className="kicker">EXPAND YOUR ROTATION</span><h2>Podcasts made for your stack</h2></div><button className="outline" onClick={() => setView('discover')}>See all matches <ArrowRight size={17}/></button></div>
      <div className="suggestgrid">{suggestions.map(s => <article className="suggest" key={s.title}><Cover type={s.art}/><div className="match">{s.score} match</div><div className="suggestbody"><span className="rank">{s.rank}</span><h3>{s.title}</h3><p>{s.desc}</p><div className="suggestfoot"><span><Clock3 size={14}/>{s.meta}</span><button aria-label={`Add ${s.title}`}><Plus/></button></div></div></article>)}</div>
    </section>
    <section className="bottomcta"><div><span className="brandmark light"><span/><span/><span/><span/></span></div><h2>Make every listen count.</h2><p>Your stack gets smarter as you listen, skip, and save.</p><button onClick={() => setView('preferences')}>Tune your preferences <ArrowRight size={17}/></button></section>
  </main>
}

function Preferences({ onDone }) {
  const [days, setDays] = useState(['Mon','Tue','Wed','Thu','Fri'])
  const [genre, setGenre] = useState(['True Crime'])
  const toggle = (value, list, setter) => setter(list.includes(value) ? list.filter(x => x !== value) : [...list, value])
  return <main className="prefs wrap">
    <button className="back" onClick={onDone}>← Back to my stack</button>
    <div className="prefshead"><p className="eyebrow"><SlidersHorizontal size={15}/> PERSONALIZE YOUR PLAN</p><h1>Tune your stack.</h1><p>Tell us what fits your life. Change any of this, any time.</p></div>
    <div className="prefgrid">
      <section className="prefcard"><span className="step">01</span><h2>When do you listen?</h2><p>Pick the days you want a fresh episode ready.</p><div className="daypills">{['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => <button className={days.includes(d)?'selected':''} onClick={() => toggle(d,days,setDays)} key={d}>{days.includes(d)&&<Check size={14}/>} {d}</button>)}</div><label>Ready by <button className="select">7:30 AM <ChevronDown size={16}/></button></label></section>
      <section className="prefcard"><span className="step">02</span><h2>What are you into?</h2><p>Choose one or mix a few. We’ll keep it balanced.</p><div className="chips">{['True Crime','News','Comedy','History','Science','Society & Culture'].map(g => <button className={genre.includes(g)?'selected':''} onClick={() => toggle(g,genre,setGenre)} key={g}>{genre.includes(g)&&<Check size={14}/>} {g}</button>)}</div><button className="subtle"><Plus size={16}/> Browse all genres</button></section>
      <section className="prefcard"><span className="step">03</span><h2>How long is your window?</h2><p>We’ll only add episodes that fit.</p><div className="range"><span>20 min</span><div><i/><b/></div><span>90+ min</span></div><div className="duration"><strong>40</strong><span>to</span><strong>90</strong><small>minutes</small></div></section>
      <section className="prefcard"><span className="step">04</span><h2>Fine-tune the mix</h2><p>Include what you love. Exclude what you don’t.</p><label className="switchrow"><div><b>Prioritize new releases</b><small>Favor episodes from the last 7 days</small></div><input type="checkbox" defaultChecked/><i/></label><label className="switchrow"><div><b>Avoid explicit content</b><small>Filter episodes marked explicit</small></div><input type="checkbox"/><i/></label><label className="switchrow"><div><b>Mix in new shows</b><small>Up to 2 discoveries per week</small></div><input type="checkbox" defaultChecked/><i/></label></section>
    </div>
    <div className="savebar"><div><Sparkles/><span><b>Your stack will include {days.length} episodes a week</b><small>{genre.join(' + ')} · 40–90 minutes</small></span></div><button onClick={onDone}>Save & rebuild my stack <ArrowRight size={18}/></button></div>
  </main>
}

function Placeholder({ type, setView }) {
  return <main className="placeholder wrap"><div className="placeholderIcon">{type==='discover'?<Search/>:<Library/>}</div><p className="eyebrow">{type.toUpperCase()}</p><h1>{type==='discover'?'Find your next favorite.':'Everything you’ve saved.'}</h1><p>Explore shows by genre, release day, episode length, platform, and what listeners like you enjoy.</p><button onClick={() => setView('home')}>Return to your stack <ArrowRight size={17}/></button></main>
}

export default function App() {
  const [view, setView] = useState('home')
  return <><Nav view={view} setView={setView}/>{view==='home'&&<HomeView setView={setView}/>} {view==='preferences'&&<Preferences onDone={()=>setView('home')}/>} {(view==='discover'||view==='library')&&<Placeholder type={view} setView={setView}/>}<footer><span>© 2026 Podstack</span><div><Apple size={15}/> Apple Podcasts <span>·</span> <Headphones size={15}/> Spotify <span>·</span> <Home size={15}/> Your listening, your way</div></footer></>
}
