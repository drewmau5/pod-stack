# PodStack Brand Guidelines

## Editorial Formulation House System — Version 1.0

This document is the visual, verbal, and interaction source of truth for PodStack.

Use it for all design, frontend, content, and product-interface work.

---

## 1. Brand Foundation

### Product idea

PodStack creates purposeful podcast formulations for habitual listeners.

A **stack** is not merely a queue or pile. It is a considered mixture of shows and episodes assembled around:

- a listener’s interests;
- their routines;
- what they need from listening;
- the shape of the coming day or week.

### Core definition

> **A PodStack is a purposeful mix of shows and episodes, formulated around your habits, interests, and whatever the week calls for.**

### Primary headline

> **Your weekly podcast stack.**

### Supporting phrase

> **Listening, formulated. Not random.**

### Atmospheric descriptor

> **A formulation house for curious ears.**

Use the descriptor sparingly. It should add character, not replace the plain-language explanation.

---

## 2. Brand Personality

PodStack should feel:

- considered;
- curious;
- quietly confident;
- editorial;
- tactile;
- intentional;
- intelligent without being academic;
- premium without becoming luxury theatre;
- distinctive without becoming difficult to use.

PodStack should not feel like:

- a generic podcast directory;
- a Spotify imitation;
- a productivity dashboard;
- a vintage pharmacy;
- a wellness storefront;
- a perfume shop;
- an AI recommendation gimmick;
- a beige lifestyle blog.

### Personality statement

> **A meticulous curator who prepares exactly the right mix for the week ahead.**

---

## 3. Master Visual Direction

### Theme

> **Editorial formulation house**

The experience combines:

- formulation and batch-label systems;
- independent editorial publishing;
- authentic podcast artwork;
- archival indexing;
- refined printed ephemera;
- modern digital interactions.

It should look like PodStack has its own visual culture, not like a component library with a theme applied.

### Primary metaphor

A weekly stack is presented as a prepared formulation:

```text
STACK NO. 03

FORMULATED FOR
TUESDAY

INCLUDES
4 LISTENS

CATEGORIES
CRIME / HISTORY / DEPTH / RESET

LISTENING NOTES
Narrative, investigative, reflective
```

The metaphor should communicate intentional curation. It must never imply medical treatment, health claims, or pharmaceuticals.

---

## 4. Core Composition

The approved homepage uses four primary structural ideas.

### A. Slim editorial rail

A narrow rail sits on the left edge of desktop layouts.

It may contain:

- the stacked PodStack wordmark;
- numbered navigation;
- a subtle active-line indicator;
- vertical formulation-house copy;
- the current stack number;
- sparse utility details.

It should resemble the spine of a printed object, not a dashboard sidebar.

### B. Editorial hero typography

The headline occupies a large vertical area with deliberate line breaks:

```text
Your
weekly
podcast
stack.
```

The punctuation may receive the accent colour.

Typography should dominate the buttons, description, and navigation.

### C. Formulation collage

The central hero object combines:

- one large formulation label;
- layered paper surfaces;
- several podcast-cover components;
- a narrow batch or catalogue strip;
- restrained stamp and code details.

The construction is asymmetric. Objects overlap naturally rather than sitting inside a clean container.

### D. Curated stack labels

Ready-made stacks appear as horizontal formulation cards beneath the hero.

They include:

- stack title;
- three or four podcast covers;
- one coloured spine;
- short composition metadata;
- one understated directional action.

They should resemble editorial inserts rather than ordinary SaaS cards.

---

## 5. Colour System

Warm paper is appropriate because the brand is based on physical formulations and labels. It must be balanced by deep ink, strong contrast, and limited accents.

```css
:root {
  --paper: #f2eee6;
  --paper-bright: #faf8f3;
  --paper-aged: #ddd4c5;

  --ink: #171512;
  --ink-soft: #4e4943;
  --ink-muted: #746d64;

  --oxblood: #7b202b;
  --oxblood-dark: #56151e;

  --forest: #183a32;
  --forest-dark: #102821;

  --mineral-rust: #b76342;
  --mineral-blue: #526b70;

  --rule: #aaa195;
  --rule-light: #d5cec3;

  --surface: rgba(250, 248, 243, 0.88);
  --focus-ring: #1c5f9e;
}
```

### Colour proportions

A normal page should be approximately:

- 50–60% paper and negative space;
- 25–35% black typography and rules;
- 8–12% one dominant accent;
- less than 5% secondary accents.

### Accent mapping

Suggested stack accents:

- Crime + History: oxblood;
- Morning Focus: forest;
- Weekend Reset: mineral rust;
- Long-Run Stories: mineral blue or deep forest.

Do not distribute every accent colour evenly across every component.

### Avoid

- muddy brown-on-beige combinations;
- orange and burgundy as co-dominant colours;
- purple gradients;
- pastel rainbow systems;
- bright Spotify-like green;
- large tinted card backgrounds;
- low-contrast grey typography;
- warm paper without deep-black contrast.

---

## 6. Typography

Typography is a primary brand asset.

### Recommended production pairing

#### Display

**Bricolage Grotesque**

Use for:

- hero headlines;
- major editorial section titles;
- stack names;
- occasional oversized numbers.

#### Body and interface

**IBM Plex Sans**

Use for:

- descriptions;
- buttons;
- navigation;
- podcast metadata;
- longer readable copy.

#### Utility and formulation labels

**IBM Plex Mono**

Use for:

- stack numbers;
- navigation numbers;
- dates;
- batch codes;
- category strings;
- metadata;
- small labels.

```css
:root {
  --font-display: "Bricolage Grotesque", "IBM Plex Sans", sans-serif;
  --font-body: "IBM Plex Sans", sans-serif;
  --font-utility: "IBM Plex Mono", monospace;
}
```

### Type scale

```css
:root {
  --text-display-xl: clamp(4.75rem, 9vw, 9.25rem);
  --text-display-lg: clamp(3.5rem, 6.5vw, 7rem);
  --text-heading: clamp(2rem, 3.4vw, 3.75rem);
  --text-subheading: clamp(1.4rem, 2vw, 2rem);
  --text-body-lg: 1.125rem;
  --text-body: 1rem;
  --text-small: 0.875rem;
  --text-utility: 0.75rem;
}
```

### Typography rules

- Display type uses a tight line height of approximately `0.86–0.96`.
- Body copy uses a line height of approximately `1.5–1.65`.
- Utility text may use slight letter spacing.
- Use uppercase only for brief labels.
- Do not turn all interface text into monospaced uppercase.
- Avoid oversized eyebrow copy above every heading.
- Avoid coloured rectangles behind isolated words.
- Use italics only for genuine editorial emphasis.
- Do not apply filters or branded typography over podcast artwork.

---

## 7. Logo

### Wordmark

Formal writing:

> **PodStack**

Preferred editorial wordmark:

```text
Pod
Stack
```

The two-line form works particularly well inside the left rail.

A horizontal `PodStack` lockup may be used where vertical space is limited.

### Mark

Use a simple mark made from two or three overlapping rectangular sheets.

It should be:

- geometric;
- minimal;
- slightly offset;
- monochrome by default;
- recognizable at favicon size.

### Preferred treatments

- black ink on paper;
- paper on forest;
- paper on oxblood.

### Avoid

- multicoloured layer marks;
- gradients;
- three-dimensional effects;
- microphone, headphone, waveform, or play-button logos;
- bottles, capsules, or laboratory imagery.

---

## 8. Homepage Structure

The homepage should be brand-led rather than dashboard-led.

### Desktop structure

1. Slim left editorial rail
2. Main hero
3. Curated stacks
4. How the stack works
5. Compact “Inside a stack” proof-of-product insert

### The homepage should not include

- a large My Stack dashboard;
- a fake browser-window screenshot;
- a large weekly calendar;
- multiple competing product previews;
- three generic feature cards;
- a testimonial carousel during the current phase;
- a large footer full of navigation columns.

The homepage needs to establish:

1. what a stack is;
2. why it is intentional;
3. what formulations are available;
4. how to begin.

---

## 9. Editorial Rail

### Desktop

Recommended width: `110–150px`.

Suggested structure:

```text
Pod
Stack

01  Today
02  My Stack
03  Discover
04  Profile

FORMULATION HOUSE
FOR CURIOUS EARS

STACK NO.
03
```

### Behaviour

- The active route receives a horizontal rule, not a filled pill.
- Navigation text remains readable and understated.
- The rail may remain sticky on long pages.
- Do not use a dark full-height dashboard background.
- Use icons only when they add necessary meaning.

### Signed-out homepage

Use marketing navigation:

- Explore
- How it works
- Build my stack
- Sign in

Do not display Today, My Stack, or Profile as though the visitor is signed in.

### Mobile

Collapse the rail into:

- a compact top wordmark;
- a menu control;
- optional bottom navigation for the signed-in product.

Do not force a narrow vertical rail onto a phone.

---

## 10. Hero Formulation Collage

The hero collage must be reproducible using ordinary web assets.

### Permitted building blocks

- authentic square podcast artwork;
- one local paper texture;
- CSS paper layers;
- borders;
- pseudo-elements;
- simple stamp SVGs;
- utility labels;
- CSS transforms;
- restrained shadows.

### Construction

The collage should contain:

- a large label panel;
- two to four backing sheets at small rotations;
- a vertical or staggered group of podcast covers;
- one narrow catalogue strip;
- one or two coded annotations.

### Example transforms

```css
.formulation-sheet:nth-child(1) {
  transform: rotate(-2.5deg) translate(-1rem, 0.5rem);
}

.formulation-sheet:nth-child(2) {
  transform: rotate(1.4deg) translate(0.5rem, -0.25rem);
}

.formulation-label {
  transform: rotate(-0.4deg);
}
```

Offsets should feel physical but controlled. Do not randomly rotate every card.

### Appropriate fields

- Stack No.
- Formulated for
- Prepared for
- Includes
- Listening notes
- Categories
- This week
- Selected around
- Four listens

Prefer `Includes` over `Yield` if the latter feels too manufactured in usability testing.

### Avoid

- dosage;
- prescription;
- treatment;
- cure;
- health benefits;
- “ingredients” as the main user-facing term;
- complex handwritten copy;
- fake signatures;
- excessive stamps;
- literal batch-production claims.

---

## 11. Podcast Artwork

The design must not rely on generated cover art.

### Production sources

Use:

- artwork supplied through Apple podcast metadata;
- RSS feed artwork;
- stable locally stored artwork for fixed marketing examples;
- a restrained PodStack fallback when artwork fails.

### Artwork rules

- Keep artwork square.
- Use `object-fit: cover`.
- Do not recolour or filter it.
- Do not apply grain over it.
- Do not distort it to imitate paper.
- Do not fabricate current episodes.
- Maintain separation between unrelated show covers.

Homepage examples may use a static set of locally stored cover assets when clearly presented as examples.

Dynamic user-facing stack pages should use live artwork data.

---

## 12. Curated Stack Cards

These cards are a central brand component.

### Anatomy

```text
[COLOURED SPINE]

Crime + History

[cover] [cover] [cover] [cover]

4 listens · investigative / historical      →
```

### Visual rules

- rectangular;
- low radius or square corners;
- thin border;
- minimal shadow;
- no large blank region;
- one strong coloured left spine;
- one or two lines of metadata;
- artwork remains dominant.

### Hover behaviour

- card rises by `3–5px`;
- coloured spine expands slightly;
- arrow shifts horizontally;
- artwork may fan outward by a few pixels.

Do not rotate the entire card dramatically.

### Responsive behaviour

- Four across on wide desktop where space permits.
- Two across on tablet.
- Horizontal snap carousel or one per row on mobile.
- No text or artwork may overflow.

---

## 13. How the Stack Works

Do not use a conventional feature grid.

Use a horizontal sequence:

```text
01
We learn your routine

02
We formulate the mix

03
Your stack is prepared

04
Your feedback refines it
```

Connect the steps using:

- a continuous rule;
- numbering;
- understated diagram icons;
- subtle staggered reveal.

Use plain-language copy beneath the formulation metaphor.

Prefer compass, index, stack, and annotation imagery over bottles or flasks.

---

## 14. Inside a Stack

The homepage needs only one small proof that this is a working product.

### Include

- Today label;
- one real podcast cover;
- show name;
- episode title;
- external listening action;
- brief progress or status;
- one link to view the complete stack.

### Exclude

- full weekly calendar;
- fake audio-player controls;
- multiple stacked days;
- detailed preference settings;
- large dashboard chrome.

PodStack does not play audio. Do not show a conventional in-app playback timeline unless it represents real integrated progress data.

---

## 15. Signed-in Product Adaptation

The formulation system should continue into the product with reduced decoration.

### Today

Use:

- `FORMULATED FOR TODAY`;
- real artwork;
- episode metadata;
- external platform icons;
- Swap, Mark listened, and Skip actions;
- one restrained label panel.

Do not rebuild the elaborate homepage collage on every page.

### My Stack

Use:

- current-day-first ordering;
- Today visibly marked;
- scheduled days before empty days;
- empty days hidden by default;
- one episode per show per week when possible;
- formulation labels as small metadata, not giant documents.

### Discover

Use:

- a strong artwork grid;
- search;
- Popular in Canada;
- Add to stack;
- Save for later;
- relevant formulation categories.

Discover should feel like browsing possible additions without calling podcasts literal ingredients.

---

## 16. Texture, Borders, and Materiality

### Texture

Use one subtle, reusable page texture.

Implementation options:

- a small local noise texture;
- SVG noise;
- a CSS radial pattern at extremely low opacity.

```css
.page-texture::before {
  position: fixed;
  inset: 0;
  pointer-events: none;
  content: "";
  opacity: 0.045;
  background-image: url("/textures/paper-noise.webp");
  mix-blend-mode: multiply;
}
```

### Rules and borders

- Primary rules: `1px solid var(--rule)`.
- Secondary rules: `1px solid var(--rule-light)`.
- Avoid applying borders to every container.
- Let whitespace create some boundaries.
- Use decorative interruptions and catalogue marks sparingly.

### Shadows

Shadows should suggest layered paper rather than floating software cards.

```css
:root {
  --shadow-paper:
    0 1px 1px rgba(23, 21, 18, 0.08),
    0 9px 24px rgba(23, 21, 18, 0.10);
}
```

Avoid:

- coloured shadows;
- large peach shadow blocks;
- heavy outer glows;
- many elevation levels.

---

## 17. Corner Radius

The approved design is primarily rectangular.

```css
:root {
  --radius-none: 0;
  --radius-small: 2px;
  --radius-medium: 6px;
  --radius-control: 3px;
}
```

Use moderate rounding only where interaction or device conventions require it.

Avoid:

- `16px–24px` radii across every card;
- pill-shaped navigation;
- rounded coloured tags everywhere;
- floating circular icon buttons without purpose.

---

## 18. Buttons

### Primary

- forest or oxblood background;
- paper-coloured text;
- rectangular;
- subtle border;
- directional arrow;
- minimum `46px` height.

### Secondary

- transparent or paper surface;
- ink or oxblood text;
- thin ink border.

### Hover

- slight translation;
- arrow movement;
- modest background darkening;
- no glow.

```css
.button-primary:hover {
  transform: translateY(-2px);
}

.button-primary:hover .button-arrow {
  transform: translateX(4px);
}
```

### Focus

Always include a visible accessible focus ring independent of the brand colour.

---

## 19. Motion System

Motion should communicate that a formulation is being assembled.

### Hero entrance sequence

1. Rail and page rules appear.
2. Headline lines reveal.
3. Backing papers slide into place.
4. Formulation label settles.
5. Podcast covers stagger inward.
6. Description and actions appear.
7. Curated stacks reveal from left to right.

Recommended total sequence: `900–1400ms`.

### Idle motion

Do not loop the full collage continuously.

Permitted:

- barely perceptible paper settling;
- one cover changing position every several seconds;
- a subtle active annotation;
- manual stack rotation.

### Hover

- one cover lifts;
- adjacent covers separate slightly;
- label annotation updates;
- movement remains under `8–12px`.

### Scroll

Curated stack cards may reveal in sequence. Avoid making every section fly, spin, or scale.

### Reduced motion

All core content must remain present and understandable when motion is disabled.

---

## 20. Layout and Spacing

```css
:root {
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.5rem;
  --space-6: 2rem;
  --space-7: 3rem;
  --space-8: 4.5rem;
  --space-9: 7rem;
}
```

### Composition rules

- Align most text to a defined editorial grid.
- Allow the formulation collage to cross grid lines.
- Use one major overlap per section rather than many small ones.
- Preserve large areas of empty paper.
- Do not fill whitespace with extra cards, badges, or decorative copy.
- Controlled density belongs around the formulation label and stack cards.

---

## 21. Copy System

### Approved language

- Your weekly podcast stack.
- Listening, formulated.
- A purposeful mix.
- Formulated around your week.
- Prepared for today.
- Curated stacks.
- Explore stacks.
- Build my own.
- Your stack is ready.
- Inside your stack.
- Listening notes.
- Selected for variety.
- From a favourite.
- New this week.
- From the archive.
- Swap this selection.
- Add to next week.

### Use cautiously

- Formulation house
- Stack number
- Prepared for
- Formulated for
- Composition

These are flavour elements. The product must remain understandable to someone who ignores the metaphor.

### Avoid

- doses;
- prescriptions;
- treatments;
- ingredients for your mind;
- audio alchemy;
- cure your boredom;
- optimize your brain;
- AI-powered curation;
- hyper-personalized listening journey;
- unlock your listening potential.

---

## 22. Accessibility

- Body text must meet WCAG AA contrast.
- Utility labels cannot be too small or faint.
- Handwritten-style text must not contain essential information.
- Active navigation cannot rely only on colour.
- Podcast images need meaningful alternative text.
- External platform icons need `aria-label` and visible focus.
- Motion must respect `prefers-reduced-motion`.
- Texture must never reduce text clarity.
- Vertical text is decorative only.
- Mobile navigation must use normal readable orientation.

---

## 23. Anti-AI Design Checklist

Reject a screen when it contains several of these:

- generic left-copy/right-dashboard hero;
- evenly distributed accent colours;
- nested rounded cards;
- floating icon tiles;
- purple or blue gradient glow;
- excessive pills;
- centred feature heading followed by three columns;
- fake app screenshot;
- generic testimonial strip;
- oversized meaningless metrics;
- vague lifestyle copy;
- too much beige with weak contrast;
- default-looking Inter typography;
- decorative abstract blobs;
- components with no relationship to the formulation concept.

Approve a screen when it demonstrates:

- one commanding composition;
- confident typography;
- clear editorial hierarchy;
- authentic podcast artwork;
- purposeful asymmetry;
- restrained formulation language;
- material layering;
- limited accents;
- honest functionality;
- one clear user action.

---

## 24. Recommended Code Structure

```text
src/
  styles/
    tokens.css
    typography.css
    texture.css
    motion.css
    global.css

  components/
    brand/
      EditorialRail.jsx
      PodStackLogo.jsx
      StackStamp.jsx
      FormulationLabel.jsx
      CatalogueCode.jsx
      PaperLayers.jsx

    stacks/
      CuratedStackCard.jsx
      StackArtworkGroup.jsx
      StackComposition.jsx
      InsideStackPreview.jsx
```

### Architecture rule

Brand decoration must remain separate from product logic.

Examples:

- `FormulationLabel` displays normalized data.
- Recommendation generation remains in recommendation services.
- Paper layers remain decorative.
- Podcast components must work without decorative wrappers.
- The app must remain functional if texture or motion fails.

---

## 25. Source-of-Truth Instruction

Every Codex design or frontend task should begin with:

> Read and follow `BRAND_GUIDELINES.md` as the visual, verbal, and interaction source of truth. The approved PodStack identity is an editorial formulation-house system with a slim left rail, commanding editorial typography, layered formulation labels, authentic podcast artwork, restrained paper materiality, and limited oxblood, forest, and mineral accents. Do not revert to the former burgundy-and-orange lifestyle design, generic SaaS components, performance-supplement packets, apothecary imagery, or AI-generated website conventions.

---

## Final Brand Summary

> **PodStack is a formulation house for listening. It assembles a purposeful mix of podcasts around the habits, interests, and needs of the week ahead.**

Visually:

> **Paper, ink, labels, authentic artwork, layered formulations, editorial restraint, and quiet but deliberate motion.**
