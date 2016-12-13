'use strict'

const yo = require('yo-yo')
const document = require('global/document')

const _lookup = require('./lib/lookup')
const util = require('./lib/util')
const render = require('./lib/render')

// state
const state = {
	testnet: true,
	input: 'jannis@ethcore.io',
	loading: false,
	error: null,
	data: null
}

// actions
const setTestnet = (testnet) => {
	state.testnet = testnet
	rerender()
}
const setInput = (input) => {
	state.input = input
	rerender()
}

const lookup = () => {
	const input = state.input
	let req
	if (util.isValidEmail(input)) req = _lookup({email: input})
	else if (util.isValidAddress(input)) req = _lookup({address: input})
	else return state.error = 'invalid input'

	state.loading = true
	req
	.then((data) => {
		state.data = data
		state.loading = false
		rerender()
	})
	.catch((err) => {
		state.error = err.message
		state.data = null
		state.loading = false
		rerender()
	})
}

const actions = {
	setTestnet: setTestnet,
	setInput: setInput,
	lookup: lookup
}

const root = render(state, actions)
document.body.appendChild(root)
const rerender = () => {
	yo.update(root, render(state, actions))
}
