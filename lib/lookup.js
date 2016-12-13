'use strict'

const fetch = require('isomorphic-fetch')
const qs = require('querystring')


const lookup = (query, testnet) => {
	const url = process.env.NODE_ENV === 'dev'
		? `http://localhost:${8443}/?`
		: `https://id.parity.io:${testnet ? 8443 : 443}/?`

	return fetch(url + qs.stringify(query))
	.then((res) => {
		console.log(res)
		return res
	})
}

module.exports = lookup
