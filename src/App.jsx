import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  ExternalLink,
  Menu,
  MoveRight,
  Plus,
  RefreshCw,
  Search,
  Settings2,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";

const platforms = {
  Spotify: { short: "S", url: "https://open.spotify.com/search/" },
  "Apple Podcasts": {
    short: "A",
    url: "https://podcasts.apple.com/us/search?term=",
  },
  "YouTube Music": { short: "Y", url: "https://music.youtube.com/search?q=" },
  "Pocket Casts": { short: "P", url: "https://pocketcasts.com/search/" },
  Other: { short: "↗", url: "https://www.google.com/search?q=" },
};

const initialEpisodes = [
  {
    id: 1,
    day: "Monday",
    date: "14",
    context: "Morning commute",
    at: "8:10 AM",
    available: 55,
    show: "Crime Junkie",
    title: "MYSTERIOUS DEATH OF: Bethany Decker",
    duration: 52,
    art: "crime",
    reason: "Fits your commute",
    tags: ["New episode", "True Crime"],
    query: "Crime Junkie Bethany Decker podcast",
  },
  {
    id: 2,
    day: "Tuesday",
    date: "15",
    context: "Workout",
    at: "6:30 AM",
    available: 60,
    show: "Dateline NBC",
    title: "The Good Soldier",
    duration: 54,
    art: "date",
    reason: "Similar to Crime Junkie",
    tags: ["New this week", "Investigation"],
    query: "Dateline NBC The Good Soldier podcast",
  },
  {
    id: 3,
    day: "Wednesday",
    date: "16",
    context: "Morning commute",
    at: "8:10 AM",
    available: 45,
    show: "Park Predators",
    title: "The Vanishing at Lake Lanier",
    duration: 38,
    art: "park",
    reason: "Within your preferred length",
    tags: ["Chosen for you", "True Crime"],
    query: "Park Predators Lake Lanier podcast",
  },
  {
    id: 4,
    day: "Thursday",
    date: "17",
    context: "Drive home",
    at: "5:20 PM",
    available: 75,
    show: "Casefile True Crime",
    title: "Case 294: The Towpath",
    duration: 72,
    art: "case",
    reason: "Not previously played",
    tags: ["Listener favourite", "True Crime"],
    query: "Casefile True Crime Towpath podcast",
  },
  {
    id: 5,
    day: "Friday",
    date: "18",
    context: "Morning commute",
    at: "8:10 AM",
    available: 45,
    show: "Anatomy of Murder",
    title: "Taken From the Front Yard",
    duration: 42,
    art: "anatomy",
    reason: "Fits your commute",
    tags: ["New episode", "Investigation"],
    query: "Anatomy of Murder Taken From Front Yard",
  },
];

const alternates = [
  {
    show: "48 Hours",
    title: "A Killing on the Cape",
    duration: 46,
    art: "case",
    reason: "Popular with listeners like you",
    query: "48 Hours A Killing on the Cape podcast",
  },
  {
    show: "The Deck",
    title: "The Queen of Hearts",
    duration: 39,
    art: "deck",
    reason: "Matches your taste",
    query: "The Deck Queen of Hearts podcast",
  },
];

const recommendations = [
  {
    show: "The Deck",
    title: "The Queen of Hearts",
    duration: 39,
    art: "deck",
    reason: "Matches your taste",
    description: "Cold cases told through the clues left behind.",
  },
  {
    show: "CounterClock",
    title: "The Pelley Family Massacre",
    duration: 44,
    art: "counter",
    reason: "Similar to a favourite show",
    description: "Investigative reporting that turns back the clock.",
  },
  {
    show: "Proof",
    title: "Murder at the Warehouse",
    duration: 48,
    art: "proof",
    reason: "Popular with listeners like you",
    description: "A fresh look at cases where the evidence is not settled.",
  },
  {
    show: "Darknet Diaries",
    title: "The Courthouse",
    duration: 51,
    art: "darknet",
    reason: "New this week",
    description: "True stories from the dark side of the internet.",
  },
];

function readStore(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function useStoredState(key, initialValue) {
  const [value, setValue] = useState(() => readStore(key, initialValue));
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

function StackMark({ animated = false }) {
  return (
    <span
      className={`stack-mark ${animated ? "assembling" : ""}`}
      aria-hidden="true"
    >
      <i />
      <i />
      <i />
    </span>
  );
}

function Logo({ onClick }) {
  return (
    <button className="logo" onClick={onClick}>
      <StackMark />
      <strong>podstack</strong>
    </button>
  );
}

function routeFromHash() {
  return window.location.hash.replace("#/", "") || "landing";
}

function AppHeader({ route, go, signedIn, setSignedIn }) {
  const [open, setOpen] = useState(false);
  if (
    !signedIn &&
    ["landing", "onboarding", "signin", "signup"].includes(route)
  ) {
    return (
      <header className="marketing-nav shell">
        <Logo onClick={() => go("landing")} />
        <nav className={open ? "open" : ""}>
          <button
            onClick={() => {
              go("landing");
              setTimeout(
                () =>
                  document
                    .getElementById("how")
                    ?.scrollIntoView({ behavior: "smooth" }),
                0,
              );
            }}
          >
            How it works
          </button>
          <button onClick={() => go("signin")}>Sign in</button>
          <button
            className="button primary small"
            onClick={() => go("onboarding")}
          >
            Build my stack
          </button>
        </nav>
        <button
          className="menu"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <X /> : <Menu />}
        </button>
      </header>
    );
  }
  return (
    <header className="app-nav shell">
      <Logo onClick={() => go("today")} />
      <nav>
        {["today", "stack", "discover"].map((item) => (
          <button
            key={item}
            className={route === item ? "active" : ""}
            onClick={() => go(item)}
          >
            {item === "stack"
              ? "My Stack"
              : item[0].toUpperCase() + item.slice(1)}
          </button>
        ))}
      </nav>
      <button
        className="avatar"
        onClick={() => go("profile")}
        aria-label="Open profile"
      >
        AM
      </button>
      <button
        className="signout"
        onClick={() => {
          setSignedIn(false);
          go("landing");
        }}
      >
        Sign out
      </button>
    </header>
  );
}

function PlatformButton({ platform, episode, compact = false }) {
  const service = platforms[platform] || platforms.Other;
  const url = `${service.url}${encodeURIComponent(episode.query || `${episode.show} ${episode.title}`)}`;
  return (
    <a
      className={`button primary platform-button ${compact ? "compact" : ""}`}
      href={url}
      target="_blank"
      rel="noreferrer"
    >
      <span className="platform-icon">{service.short}</span>Open in {platform}
      <ExternalLink size={16} />
    </a>
  );
}

function Cover({ type, size = "medium" }) {
  const labels = {
    crime: ["CRIME", "JUNKIE"],
    date: ["DATELINE", "NBC"],
    park: ["PARK", "PREDATORS"],
    case: ["CASEFILE", "TRUE CRIME"],
    anatomy: ["ANATOMY", "OF MURDER"],
    deck: ["THE", "DECK"],
    counter: ["COUNTER", "CLOCK"],
    proof: ["PROOF", "A TRUE CRIME PODCAST"],
    darknet: ["DARKNET", "DIARIES"],
  };
  return (
    <div className={`cover ${type} ${size}`}>
      <span>{labels[type]?.[0]}</span>
      <strong>{labels[type]?.[1]}</strong>
    </div>
  );
}

function Landing({ go }) {
  const sample = initialEpisodes.filter((_, i) => [0, 1, 3].includes(i));
  return (
    <main className="landing">
      <section className="hero shell">
        <div className="hero-copy">
          <p className="label">A PLAN FOR WHAT YOU PLAY</p>
          <h1>
            Your podcasts,
            <br />
            <span>already planned.</span>
          </h1>
          <p className="lede">
            Tell us when you listen, how much time you have, and what you like.
            Podstack builds a personalized schedule, so your next episode is
            always ready.
          </p>
          <div className="hero-actions">
            <button className="button primary" onClick={() => go("onboarding")}>
              Build my first stack <ArrowRight />
            </button>
            <button
              className="button secondary"
              onClick={() =>
                document
                  .getElementById("example")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              See an example week
            </button>
          </div>
          <div className="positioning">
            <StackMark />
            <strong>
              Your podcast app plays it.
              <br />
              Podstack plans it.
            </strong>
          </div>
        </div>
        <div className="hero-stack" id="example">
          <p className="label">HERE’S WHAT A WEEK WITH PODSTACK LOOKS LIKE.</p>
          {sample.map((ep, i) => (
            <div
              className="sample-card"
              style={{ "--offset": `${i * 10}px` }}
              key={ep.id}
            >
              <div className="sample-day">
                <b>{ep.day.toUpperCase()}</b>
                <span>
                  {ep.available}-minute {ep.context.toLowerCase()}
                </span>
              </div>
              <Cover type={ep.art} size="small" />
              <div>
                <b>{ep.show}</b>
                <strong>{ep.title}</strong>
                <span>{ep.duration} min</span>
              </div>
              <span className="sample-open">
                Open in Spotify <ExternalLink />
              </span>
            </div>
          ))}
        </div>
      </section>
      <section className="promise">
        <div className="shell">
          <span>WE BUILD THE STACK.</span>
          <h2>You press play.</h2>
          <p>
            Podstack never replaces your podcast app. It removes the searching,
            choosing, remembering, and organizing that happens before you
            listen.
          </p>
        </div>
      </section>
      <section className="how shell" id="how">
        <div className="section-heading">
          <p className="label">HOW IT WORKS</p>
          <h2>Open Podstack. See what’s next. Press play.</h2>
        </div>
        <div className="steps">
          <article>
            <span>01</span>
            <CalendarDays />
            <h3>Set your routine</h3>
            <p>
              Tell Podstack when you listen and how much time you usually have.
            </p>
          </article>
          <article>
            <span>02</span>
            <Settings2 />
            <h3>Tell us your taste</h3>
            <p>
              Choose the genres, shows, and topics you enjoy, along with
              anything you want to avoid.
            </p>
          </article>
          <article>
            <span>03</span>
            <ExternalLink />
            <h3>Press play</h3>
            <p>
              See what’s next, then continue in the podcast app you already use.
            </p>
          </article>
        </div>
        <div className="stack-definition">
          <StackMark />
          <div>
            <p className="label">WHAT IS A STACK?</p>
            <strong>
              Your stack is your ready-made listening lineup: the right
              episodes, in the right order, sized to fit your week.
            </strong>
          </div>
        </div>
      </section>
      <section className="landing-cta">
        <StackMark animated />
        <h2>
          Your next listens,
          <br />
          stacked and ready.
        </h2>
        <button className="button primary" onClick={() => go("onboarding")}>
          Build my stack <ArrowRight />
        </button>
      </section>
    </main>
  );
}

function Progress({ step }) {
  return (
    <div className="onboarding-progress">
      <span>STEP {Math.min(step, 4)} OF 4</span>
      <div>
        {[1, 2, 3, 4].map((n) => (
          <i className={n <= step ? "done" : ""} key={n} />
        ))}
      </div>
    </div>
  );
}

function Toggle({ checked, onChange, title, copy }) {
  return (
    <button className="rule" onClick={() => onChange(!checked)}>
      <span>
        <strong>{title}</strong>
        <small>{copy}</small>
      </span>
      <i className={checked ? "on" : ""}>
        <b />
      </i>
    </button>
  );
}

function Onboarding({ go, preferences, setPreferences }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const update = (patch) => setPreferences({ ...preferences, ...patch });
  const toggleArray = (key, value) =>
    update({
      [key]: preferences[key].includes(value)
        ? preferences[key].filter((x) => x !== value)
        : [...preferences[key], value],
    });
  const next = () => {
    if (step < 4) setStep(step + 1);
    else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setReady(true);
      }, 1700);
    }
  };
  if (loading)
    return (
      <main className="generator">
        <StackMark animated />
        <h1>Planning your week…</h1>
        <p>
          Matching episodes to your schedule, preferences, and available time.
        </p>
        <div className="generating-cards">
          <i />
          <i />
          <i />
        </div>
      </main>
    );
  if (ready)
    return (
      <main className="account-gate">
        <StackMark />
        <p className="label">YOUR FIRST PLAN</p>
        <h1>Your stack is ready.</h1>
        <p>
          Create an account to save your plan, preferences, and listening
          history.
        </p>
        <div className="preview-strip">
          {initialEpisodes.slice(0, 3).map((ep) => (
            <Cover type={ep.art} size="small" key={ep.id} />
          ))}
        </div>
        <button className="button auth google" onClick={() => go("signup")}>
          G <span>Continue with Google</span>
        </button>
        <button className="button auth" onClick={() => go("signup")}>
          Continue with email
        </button>
        <p className="account-link">
          Already have an account?{" "}
          <button onClick={() => go("signin")}>Sign in</button>
        </p>
      </main>
    );
  const routines = preferences.routines;
  return (
    <main className="onboarding shell">
      <div className="onboarding-top">
        <button
          onClick={() => (step === 1 ? go("landing") : setStep(step - 1))}
        >
          <ArrowLeft /> Back
        </button>
        <Progress step={step} />
        <span />
      </div>
      <div className="onboarding-panel">
        {step === 1 && (
          <>
            <p className="label">LISTENING ROUTINE</p>
            <h1>When do you usually listen?</h1>
            <p className="intro-copy">
              Add the days you want something ready. Each day can have its own
              context and time.
            </p>
            <div className="routine-list">
              {routines.map((row, i) => (
                <div className="routine-row" key={row.day}>
                  <button
                    className="day-check"
                    onClick={() =>
                      update({
                        routines: routines.map((r, j) =>
                          j === i ? { ...r, active: !r.active } : r,
                        ),
                      })
                    }
                  >
                    <i className={row.active ? "checked" : ""}>
                      {row.active && <Check />}
                    </i>
                    <b>{row.day}</b>
                  </button>
                  {row.active && (
                    <>
                      <select
                        value={row.context}
                        onChange={(e) =>
                          update({
                            routines: routines.map((r, j) =>
                              j === i ? { ...r, context: e.target.value } : r,
                            ),
                          })
                        }
                      >
                        <option>Morning commute</option>
                        <option>Workout</option>
                        <option>Drive home</option>
                        <option>Walk</option>
                        <option>Housework</option>
                      </select>
                      <label>
                        <input
                          type="number"
                          min="10"
                          max="180"
                          value={row.minutes}
                          onChange={(e) =>
                            update({
                              routines: routines.map((r, j) =>
                                j === i
                                  ? { ...r, minutes: Number(e.target.value) }
                                  : r,
                              ),
                            })
                          }
                        />{" "}
                        min
                      </label>
                    </>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <p className="label">LISTENING TASTE</p>
            <h1>What do you want to hear?</h1>
            <p className="intro-copy">
              Choose as many as you like. You can change the mix later.
            </p>
            <Field title="Genres">
              {[
                "True Crime",
                "News",
                "Comedy",
                "History",
                "Science",
                "Society & Culture",
                "Technology",
                "Business",
              ].map((x) => (
                <Choice
                  key={x}
                  selected={preferences.genres.includes(x)}
                  onClick={() => toggleArray("genres", x)}
                >
                  {x}
                </Choice>
              ))}
            </Field>
            <Field title="Favourite shows">
              {[
                "Crime Junkie",
                "Dateline NBC",
                "This American Life",
                "The Daily",
                "Radiolab",
              ].map((x) => (
                <Choice
                  key={x}
                  selected={preferences.shows.includes(x)}
                  onClick={() => toggleArray("shows", x)}
                >
                  {x}
                </Choice>
              ))}
            </Field>
            <Field title="Formats">
              {[
                "Single-story",
                "Interviews",
                "Investigative series",
                "Roundtable",
                "Narrative",
              ].map((x) => (
                <Choice
                  key={x}
                  selected={preferences.formats.includes(x)}
                  onClick={() => toggleArray("formats", x)}
                >
                  {x}
                </Choice>
              ))}
            </Field>
          </>
        )}
        {step === 3 && (
          <>
            <p className="label">LISTENING RULES</p>
            <h1>Set the rules for your stack.</h1>
            <p className="intro-copy">
              Prioritize what matters and filter out what does not.
            </p>
            <div className="rules">
              {[
                [
                  "newReleases",
                  "Prioritize new releases",
                  "Favor episodes released in the last 7 days",
                ],
                [
                  "explicit",
                  "Avoid explicit content",
                  "Exclude episodes marked explicit",
                ],
                [
                  "newShows",
                  "Mix in new shows",
                  "Include up to two discoveries each week",
                ],
                [
                  "serialized",
                  "Avoid serialized seasons",
                  "Skip episodes that require listening in order",
                ],
                [
                  "heard",
                  "Skip episodes already heard",
                  "Use your listening history to avoid repeats",
                ],
              ].map(([key, title, copy]) => (
                <Toggle
                  key={key}
                  checked={preferences.rules[key]}
                  onChange={(v) =>
                    update({ rules: { ...preferences.rules, [key]: v } })
                  }
                  title={title}
                  copy={copy}
                />
              ))}
            </div>
            <div className="length-rule">
              <b>Episode length</b>
              <div>
                <label>
                  Minimum{" "}
                  <input
                    type="number"
                    value={preferences.min}
                    onChange={(e) => update({ min: e.target.value })}
                  />{" "}
                  min
                </label>
                <span>to</span>
                <label>
                  Maximum{" "}
                  <input
                    type="number"
                    value={preferences.max}
                    onChange={(e) => update({ max: e.target.value })}
                  />{" "}
                  min
                </label>
              </div>
            </div>
            <label className="text-field">
              Topics to exclude
              <input
                value={preferences.excluded}
                onChange={(e) => update({ excluded: e.target.value })}
                placeholder="e.g. graphic violence, politics"
              />
            </label>
          </>
        )}
        {step === 4 && (
          <>
            <p className="label">PREFERRED LISTENING APP</p>
            <h1>Where do you usually listen?</h1>
            <p className="intro-copy">
              Every episode button will take you straight there. Podstack does
              not play audio.
            </p>
            <div className="platform-grid">
              {Object.keys(platforms).map((name) => (
                <button
                  className={preferences.platform === name ? "selected" : ""}
                  onClick={() => update({ platform: name })}
                  key={name}
                >
                  <span>{platforms[name].short}</span>
                  <b>{name}</b>
                  {preferences.platform === name && <CheckCircle2 />}
                </button>
              ))}
            </div>
            <div className="platform-note">
              <ExternalLink />
              <span>
                <b>Your podcast app does the playing.</b>
                <small>
                  Podstack simply opens the episode in your selected service.
                </small>
              </span>
            </div>
          </>
        )}
        <div className="onboarding-actions">
          <span>
            {step === 1
              ? `${routines.filter((r) => r.active).length} listening days selected`
              : "You can edit this later"}
          </span>
          <button className="button primary" onClick={next}>
            {step === 4 ? "Generate my stack" : "Continue"} <ArrowRight />
          </button>
        </div>
      </div>
    </main>
  );
}

function Field({ title, children }) {
  return (
    <div className="choice-field">
      <b>{title}</b>
      <div>{children}</div>
    </div>
  );
}
function Choice({ selected, onClick, children }) {
  return (
    <button className={selected ? "selected" : ""} onClick={onClick}>
      {selected && <Check />}
      {children}
    </button>
  );
}

function Today({ go, episodes, setEpisodes, listened, setListened, platform }) {
  const today = episodes[0];
  const swap = () =>
    setEpisodes(
      episodes.map((ep, i) =>
        i === 0
          ? {
              ...ep,
              ...alternates[0],
              tags: ["Matches your taste", "True Crime"],
            }
          : ep,
      ),
    );
  return (
    <main className="product shell">
      <section className="today-heading">
        <p className="label">GOOD MORNING, ANDREW</p>
        <h1>
          Monday’s listen
          <br />
          is ready.
        </h1>
        <p>One episode, chosen to fit the time you have.</p>
      </section>
      <section
        className={`today-card ${listened.includes(today.id) ? "listened" : ""}`}
      >
        <div className="context-bar">
          <div>
            <CalendarDays />
            <span>
              <b>
                {today.day} {today.context.toLowerCase()}
              </b>
              <small>{today.at}</small>
            </span>
          </div>
          <div>
            <Clock3 />
            <span>
              <b>{today.available} minutes</b>
              <small>available</small>
            </span>
          </div>
        </div>
        <div className="today-content">
          <Cover type={today.art} size="large" />
          <div className="today-details">
            <p className="show">{today.show}</p>
            <h2>{today.title}</h2>
            <p className="duration">{today.duration} min episode</p>
            <div className="fit-tags">
              <span>
                <Check /> {today.reason}
              </span>
              {today.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <PlatformButton platform={platform} episode={today} />
            <div className="secondary-actions">
              <button onClick={swap}>
                <RefreshCw /> Swap episode
              </button>
              <button
                onClick={() =>
                  setListened(
                    listened.includes(today.id)
                      ? listened.filter((x) => x !== today.id)
                      : [...listened, today.id],
                  )
                }
              >
                <CheckCircle2 />{" "}
                {listened.includes(today.id)
                  ? "Marked as listened"
                  : "Mark as listened"}
              </button>
              <button onClick={() => go("stack")}>
                <CalendarDays /> View full week
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="coming-up">
        <div className="section-row">
          <div>
            <p className="label">NEXT IN YOUR STACK</p>
            <h2>The rest of your week</h2>
          </div>
          <button onClick={() => go("stack")}>
            View full plan <ArrowRight />
          </button>
        </div>
        <div className="compact-list">
          {episodes.slice(1).map((ep) => (
            <article key={ep.id}>
              <div className="compact-date">
                <b>{ep.day.slice(0, 3).toUpperCase()}</b>
                <strong>{ep.date}</strong>
              </div>
              <Cover type={ep.art} size="tiny" />
              <div>
                <b>{ep.show}</b>
                <strong>{ep.title}</strong>
                <span>
                  {ep.context} · {ep.duration} min
                </span>
              </div>
              <span className="ready">READY</span>
            </article>
          ))}
        </div>
      </section>
      <section className="planned">
        <div>
          <p className="label">PLANNED TO FIT YOUR WEEK</p>
          <h2>
            Less choosing.
            <br />
            More listening.
          </h2>
        </div>
        <div>
          <strong>5</strong>
          <span>episodes ready</span>
        </div>
        <div>
          <strong>3h 47m</strong>
          <span>planned listening</span>
        </div>
        <div>
          <strong>0</strong>
          <span>repeats</span>
        </div>
      </section>
    </main>
  );
}

function EpisodeCard({
  episode,
  platform,
  listened,
  onListen,
  onSwap,
  onRemove,
  onMove,
}) {
  return (
    <article className={`episode-card ${listened ? "listened" : ""}`}>
      <div className="episode-date">
        <b>{episode.day.toUpperCase()}</b>
        <strong>{episode.date}</strong>
        <span>
          {episode.context}
          <br />
          {episode.available} min available
        </span>
      </div>
      <Cover type={episode.art} />
      <div className="episode-copy">
        <p>{episode.show}</p>
        <h3>{episode.title}</h3>
        <span>
          {episode.duration} min · <b>{episode.reason}</b>
        </span>
      </div>
      <div className="episode-buttons">
        <PlatformButton compact platform={platform} episode={episode} />
        <div>
          <button onClick={onSwap}>
            <RefreshCw /> Swap
          </button>
          <button onClick={onMove}>
            <MoveRight /> Move
          </button>
          <button onClick={onListen}>
            <CheckCircle2 /> {listened ? "Listened" : "Mark listened"}
          </button>
          <button aria-label="Remove episode" onClick={onRemove}>
            <Trash2 />
          </button>
        </div>
      </div>
    </article>
  );
}

function MyStack({ episodes, setEpisodes, listened, setListened, platform }) {
  const [message, setMessage] = useState("");
  const toast = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 1800);
  };
  const swap = (id) => {
    const alt = alternates[id % 2];
    setEpisodes(episodes.map((ep) => (ep.id === id ? { ...ep, ...alt } : ep)));
    toast("Episode swapped. Your plan is updated.");
  };
  const move = (id) => {
    const index = episodes.findIndex((ep) => ep.id === id);
    if (index < episodes.length - 1) {
      const copy = [...episodes];
      [copy[index], copy[index + 1]] = [
        { ...copy[index + 1], day: copy[index].day, date: copy[index].date },
        {
          ...copy[index],
          day: copy[index + 1].day,
          date: copy[index + 1].date,
        },
      ];
      setEpisodes(copy);
      toast("Episode moved to the next listening day.");
    }
  };
  const rebuild = () => {
    setEpisodes(
      initialEpisodes.map((ep, i) =>
        i === 2 ? { ...ep, ...alternates[1] } : ep,
      ),
    );
    setListened([]);
    toast("Your listening plan was rebuilt.");
  };
  return (
    <main className="product stack-page shell">
      {message && (
        <div className="toast">
          <Check /> {message}
        </div>
      )}
      <div className="stack-header">
        <div>
          <p className="label">THIS WEEK’S LISTENING PLAN</p>
          <h1>Your week is ready.</h1>
          <p>
            {episodes.length} episodes selected for 3 hours and 47 minutes of
            listening.
          </p>
        </div>
        <button className="button secondary" onClick={rebuild}>
          <RefreshCw /> Rebuild entire stack
        </button>
      </div>
      <div className="week-progress">
        <div>
          <span>
            {listened.length} of {episodes.length} listened
          </span>
          <span>
            {Math.round((listened.length / Math.max(episodes.length, 1)) * 100)}
            %
          </span>
        </div>
        <i>
          <b
            style={{
              width: `${(listened.length / Math.max(episodes.length, 1)) * 100}%`,
            }}
          />
        </i>
      </div>
      <div className="episode-stack">
        {episodes.map((ep) => (
          <EpisodeCard
            key={ep.id}
            episode={ep}
            platform={platform}
            listened={listened.includes(ep.id)}
            onListen={() =>
              setListened(
                listened.includes(ep.id)
                  ? listened.filter((x) => x !== ep.id)
                  : [...listened, ep.id],
              )
            }
            onSwap={() => swap(ep.id)}
            onMove={() => move(ep.id)}
            onRemove={() => setEpisodes(episodes.filter((x) => x.id !== ep.id))}
          />
        ))}
      </div>
      <button
        className="add-listen"
        onClick={() => {
          setEpisodes([
            ...episodes,
            {
              ...initialEpisodes[2],
              id: Date.now(),
              day: "Saturday",
              date: "19",
              context: "Weekend walk",
            },
          ]);
          toast("Weekend listen added.");
        }}
      >
        <Plus /> Add a weekend listen
      </button>
    </main>
  );
}

function Discover() {
  const [saved, setSaved] = useStoredState("podstack-saved", {});
  const add = (title, list) => setSaved({ ...saved, [title]: list });
  return (
    <main className="product discover-page shell">
      <div className="discover-heading">
        <p className="label">DISCOVER WITH A PURPOSE</p>
        <h1>
          Find something
          <br />
          worth adding.
        </h1>
        <p>
          Recommendations selected for your routine—not an endless directory.
        </p>
        <div className="searchbox">
          <Search />
          <input placeholder="Search shows, episodes, or topics" />
        </div>
      </div>
      <div className="filter-row">
        <button className="active">For you</button>
        <button>Fits my commute</button>
        <button>New this week</button>
        <button>Saved for later</button>
      </div>
      <div className="recommendations">
        {recommendations.map((item) => (
          <article key={item.title}>
            <Cover type={item.art} size="large" />
            <div className="recommendation-copy">
              <span className="reason-pill">
                <Sparkles /> {item.reason}
              </span>
              <p>{item.show}</p>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <span>{item.duration} min</span>
              <div className="add-menu">
                <button
                  className="button primary small"
                  onClick={() => add(item.title, "This week")}
                >
                  <Plus /> {saved[item.title] || "Add to this week"}
                </button>
                <details>
                  <summary>
                    <ChevronDown />
                  </summary>
                  <div>
                    <button onClick={() => add(item.title, "Next week")}>
                      Add to next week
                    </button>
                    <button onClick={() => add(item.title, "Saved")}>
                      Save for later
                    </button>
                  </div>
                </details>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

function AuthPage({ type, go, onAuth }) {
  const signup = type === "signup";
  return (
    <main className="auth-page">
      <div className="auth-panel">
        <Logo onClick={() => go("landing")} />
        <div>
          <p className="label">{signup ? "SAVE YOUR STACK" : "WELCOME BACK"}</p>
          <h1>{signup ? "Create your account." : "Sign in to Podstack."}</h1>
          <p>
            {signup
              ? "Keep your plan, preferences, and listening history in one place."
              : "Your next listen is waiting."}
          </p>
          <button className="button auth google" onClick={onAuth}>
            G <span>Continue with Google</span>
          </button>
          <div className="or">
            <i />
            or
            <i />
          </div>
          <label>
            Email address
            <input type="email" placeholder="you@example.com" />
          </label>
          <label>
            Password
            <input type="password" placeholder="••••••••" />
          </label>
          <button className="button primary full" onClick={onAuth}>
            {signup ? "Create account" : "Sign in"}
          </button>
          <p className="account-link">
            {signup ? "Already have an account?" : "New to Podstack?"}{" "}
            <button onClick={() => go(signup ? "signin" : "signup")}>
              {signup ? "Sign in" : "Create an account"}
            </button>
          </p>
          <small className="prototype-note">
            Prototype only—authentication will be connected to Supabase later.
          </small>
        </div>
      </div>
      <div className="auth-art">
        <StackMark animated />
        <h2>
          Your podcast app plays it.
          <br />
          <span>Podstack plans it.</span>
        </h2>
      </div>
    </main>
  );
}

function Profile({ preferences, setPreferences, go }) {
  return (
    <main className="product profile shell">
      <button className="back-link" onClick={() => go("today")}>
        <ArrowLeft /> Back to Today
      </button>
      <p className="label">PROFILE & PREFERENCES</p>
      <h1>Edit my listening plan</h1>
      <section>
        <div className="profile-card">
          <span>AM</span>
          <div>
            <b>Andrew Miller</b>
            <small>andrew@example.com</small>
          </div>
        </div>
        <Field title="Preferred listening app">
          <div className="profile-platforms">
            {Object.keys(platforms).map((p) => (
              <Choice
                key={p}
                selected={preferences.platform === p}
                onClick={() => setPreferences({ ...preferences, platform: p })}
              >
                {p}
              </Choice>
            ))}
          </div>
        </Field>
        <div className="profile-summary">
          <div>
            <b>Listening days</b>
            <span>
              {preferences.routines
                .filter((r) => r.active)
                .map((r) => r.day.slice(0, 3))
                .join(", ")}
            </span>
          </div>
          <div>
            <b>Episode length</b>
            <span>
              {preferences.min}–{preferences.max} minutes
            </span>
          </div>
          <div>
            <b>Top genres</b>
            <span>{preferences.genres.join(", ")}</span>
          </div>
        </div>
        <button className="button secondary" onClick={() => go("onboarding")}>
          Edit full listening plan <Settings2 />
        </button>
      </section>
    </main>
  );
}

const defaultPreferences = {
  platform: "Spotify",
  genres: ["True Crime"],
  shows: ["Crime Junkie", "Dateline NBC"],
  formats: ["Single-story", "Investigative series"],
  min: 35,
  max: 90,
  excluded: "",
  rules: {
    newReleases: true,
    explicit: true,
    newShows: true,
    serialized: false,
    heard: true,
  },
  routines: [
    ["Monday", "Morning commute", 55, true],
    ["Tuesday", "Workout", 60, true],
    ["Wednesday", "Morning commute", 45, true],
    ["Thursday", "Drive home", 75, true],
    ["Friday", "Morning commute", 45, true],
    ["Saturday", "Walk", 40, false],
    ["Sunday", "Housework", 60, false],
  ].map(([day, context, minutes, active]) => ({
    day,
    context,
    minutes,
    active,
  })),
};

export default function App() {
  const [route, setRoute] = useState(routeFromHash);
  const [signedIn, setSignedIn] = useStoredState("podstack-signed-in", false);
  const [preferences, setPreferences] = useStoredState(
    "podstack-preferences",
    defaultPreferences,
  );
  const [episodes, setEpisodes] = useStoredState(
    "podstack-week",
    initialEpisodes,
  );
  const [listened, setListened] = useStoredState("podstack-listened", []);
  useEffect(() => {
    const change = () => setRoute(routeFromHash());
    window.addEventListener("hashchange", change);
    return () => window.removeEventListener("hashchange", change);
  }, []);
  const go = (next) => {
    window.location.hash = `/${next}`;
    setRoute(next);
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    if (signedIn && route === "landing") {
      window.location.hash = "/today";
      setRoute("today");
      window.scrollTo(0, 0);
    }
  }, [signedIn, route]);
  const auth = () => {
    setSignedIn(true);
    go("today");
  };
  return (
    <>
      <AppHeader
        route={route}
        go={go}
        signedIn={signedIn}
        setSignedIn={setSignedIn}
      />
      {route === "landing" && <Landing go={go} />}{" "}
      {route === "onboarding" && (
        <Onboarding
          go={go}
          preferences={preferences}
          setPreferences={setPreferences}
        />
      )}{" "}
      {route === "today" && (
        <Today
          go={go}
          episodes={episodes}
          setEpisodes={setEpisodes}
          listened={listened}
          setListened={setListened}
          platform={preferences.platform}
        />
      )}{" "}
      {route === "stack" && (
        <MyStack
          episodes={episodes}
          setEpisodes={setEpisodes}
          listened={listened}
          setListened={setListened}
          platform={preferences.platform}
        />
      )}{" "}
      {route === "discover" && <Discover />}{" "}
      {route === "signin" && <AuthPage type="signin" go={go} onAuth={auth} />}{" "}
      {route === "signup" && <AuthPage type="signup" go={go} onAuth={auth} />}{" "}
      {route === "profile" && (
        <Profile
          preferences={preferences}
          setPreferences={setPreferences}
          go={go}
        />
      )}
      <footer>
        <Logo onClick={() => go(signedIn ? "today" : "landing")} />
        <span>Your podcast app plays it. Podstack plans it.</span>
        <small>© 2026 Podstack</small>
      </footer>
    </>
  );
}
