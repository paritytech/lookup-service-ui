'use strict'

const yo = require('yo-yo')
const roundTo = require('round-to')

const styles = require('./index.csjs.js')
const renderForm = require('./form')
const renderStatus = require('./status')
const renderData = require('./data')

const render = (state, actions) => yo `
  <div className="system-sans-serif ${styles.container}">
    <img className="${styles.logo}" src="logo.svg" alt="Parity Logo" />
    ${renderForm(state, actions)}
    ${renderStatus(state, actions)}
    ${renderData(state, actions)}
  </div>
`

module.exports = render
