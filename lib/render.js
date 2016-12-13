'use strict'

const yo = require('yo-yo')
const roundTo = require('round-to')

const renderForm = (state, actions) => {
  const chainOnChange = (e) => {
    const chain = e.target.value
    actions.setTestnet(chain === 'testnet')
  }
  const inputOnChange = (e) => {
    const input = e.target.value
    actions.setInput(input.trim())
  }

  return yo `
    <div>
      <select onchange=${chainOnChange}>
        <option
          value="mainnet" selected="${!state.testnet}"
        >Mainnet</option>
        <option
          value="testnet" selected="${state.testnet}"
        >Testnet</option>
      </select>
      <input
        type="email" value="${state.input}"
        onchange=${inputOnChange} onkeypress=${inputOnChange}
      />
      <button onclick=${actions.lookup}>Lookup</button>
    </div>
  `
}

const renderStatus = (state, actions) => [
  state.error ? yo `<p>${state.error}</p>` : null,
  state.loading ? yo `<div class="spinner" />` : null
]

const renderData = (state, actions) => {
  if (!state.data) return null
  const {address, tokens, badges} = state.data

  const renderedTokens = tokens.map((token) => yo `
    <li>
      <code>${roundTo(parseFloat(token.balance), 3)}</code>
      <code><abbr title="${token.name}">${token.TLA}</abbr></code>
    </li>
  `)

  const renderedBadges = badges.map((badge) => yo `
    <li><abbr title="${badge.address}">${badge.title}</abbr></li>
  `)

  return yo `
    <div>
      <code>${address}</code>
      <ul>${renderedTokens}</ul>
      <ul>${renderedBadges}</ul>
    </div>
  `
}

const render = (state, actions) => yo `
  <div>
    ${renderForm(state, actions)}
    ${renderStatus(state, actions)}
    ${renderData(state, actions)}
  </div>
`

module.exports = render
