'use strict'

const yo = require('yo-yo')
const document = require('global/document')

const render = (state, actions) => {
	return yo `
		<p>todo</p>
	`
}

// state
const state = {}

// actions
const actions = {}

const root = render(state, actions)
document.body.appendChild(root)
const rerender = () => {
	yo.update(root, render(state, actions))
}
