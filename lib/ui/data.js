'use strict'

const yo = require('yo-yo')
const copy = require('copy-to-clipboard')
const roundTo = require('round-to')
const rawgit = require('rawgit-url-formatter')

const styles = require('./data.csjs.js')
const {etherscanLink} = require('../util')

const render = (state, actions) => {
  if (!state.data) return null
  const {address, tokens, badges} = state.data

  const copyOnClick = () => {
    copy(address)
  }

  const renderedAddress = yo `
      <div>
        <a
          class="${styles.address}"
          href="${etherscanLink(address, state.testnet)}"
          target="_blank"
        >
          <code>${address}</code>
        </a>
        <button
          class="${styles.copy}"
          onclick=${copyOnClick}
        >copy</button>
      </div>
  `

  const renderedTokens = tokens.map((token) => yo `
    <li class="${styles.chip}">
      <img src="${token.img ? rawgit(token.img).cdn : null}" />
      <code>${roundTo(parseFloat(token.balance), 5)}</code>
      <code><abbr title="${token.name}">${token.TLA}</abbr></code>
    </li>
  `)

  const renderedBadges = badges.map((badge) => yo `
    <li class="${styles.chip}">
      <a
        href="${etherscanLink(badge.address, state.testnet)}"
        target="_blank"
      >
        <img src="${badge.img ? rawgit(badge.img).cdn : null}" />
        <abbr title="${badge.address}">${badge.title}</abbr>
      </a>
    </li>
  `)

  return yo `
    <div class="${styles.container}">
      <h1 class="${styles.heading}">Address</h1>
      ${renderedAddress}
      <h1 class="${styles.heading}">Tokens</h1>
      <ul class="${styles.tokens}">
        ${renderedTokens}
      </ul>
      <h1 class="${styles.heading}">Badges</h1>
      <ul class="${styles.badges}">
        ${renderedBadges}
      </ul>
    </div>
  `
}

module.exports = render
