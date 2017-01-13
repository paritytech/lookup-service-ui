'use strict'

const fetch = require('isomorphic-fetch')
const qs = require('querystring')

const lookup = (query, testnet) => {
  const url = process.env.NODE_ENV === 'dev'
    ? `https://localhost:${8443}/?`
    : `https://id.parity.io:${testnet ? 8443 : 443}/?`

  return fetch(url + qs.stringify(query))
  .then((res) => {
    if (!res.ok) {
      const isJSON = res.headers.get('Content-Type').slice(0, 16) === 'application/json'
      if (isJSON) {
        return res.json()
        .then((data) => {
          throw new Error(data.message)
        }, () => {
          throw new Error(res.statusText)
        })
      }
      throw new Error(res.statusText)
    }
    return res.json()
  })
}

module.exports = lookup
