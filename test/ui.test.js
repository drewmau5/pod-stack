import test from 'node:test'
import assert from 'node:assert/strict'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { ListenLink } from '../src/components/UI.jsx'

test('platform links render only valid destinations with accessible labels',()=>{const html=renderToStaticMarkup(React.createElement(ListenLink,{item:{podcastName:'Crime Junkie',appleUrl:'https://podcasts.apple.com/show',spotifyUrl:'',youtubeMusicUrl:'notaurl'}}));assert.match(html,/aria-label="Open Crime Junkie in Apple Podcasts"/);assert.doesNotMatch(html,/Spotify/);assert.match(html,/noopener noreferrer/)})
test('missing platform URLs use an episode page fallback without blank actions',()=>{const html=renderToStaticMarkup(React.createElement(ListenLink,{item:{podcastName:'Show',webpageUrl:'https://example.com/episode'}}));assert.match(html,/>Open episode page</);assert.doesNotMatch(html,/platform-link/)})
