'use strict'

const yo = require('yo-yo')

const styles = require('./index.csjs.js')
const renderForm = require('./form')
const renderStatus = require('./status')
const renderData = require('./data')

const render = (state, actions) => yo `
  <div className="system-sans-serif ${styles.container}">
    <a className="${styles.logo}" href="https://parity.io/">
      <img src="logo.svg" alt="Parity Logo" />
    </a>
    ${renderForm(state, actions)}
    ${renderStatus(state, actions)}
    ${renderData(state, actions)}
  </div>
`

module.exports = render
