'use strict'

const yo = require('yo-yo')

const render = (state, actions) => [
  state.error ? yo `
  	<p class="notification error">${state.error}</p>
  ` : null,
  state.loading ? yo `
  	<div class="spinner"><div /></div>
  ` : null
]

module.exports = render
