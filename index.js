'use strict'

const yo = require('yo-yo')
const document = require('global/document')

const _lookup = require('./lib/lookup')
const util = require('./lib/util')
const render = require('./lib/ui')

// state
const state = {
  testnet: true,
  input: '',
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
  if (util.isValidEmail(input)) {
    state.error = null
    req = _lookup({email: input}, state.testnet)
  } else if (util.isValidAddress(input)) {
    state.error = null
    req = _lookup({address: input}, state.testnet)
  } else {
    state.error = 'invalid input'
    return rerender()
  }

  state.loading = true
  rerender()
  req
  .then((data) => {
    state.error = null
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
