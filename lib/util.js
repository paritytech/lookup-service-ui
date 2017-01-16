'use strict'

const {keccak_256} = require('js-sha3')

const sha3 = (str, opt) => '0x' + keccak_256(str, opt)

const isValidEmail = (str) => {
  if (typeof str !== 'string') return false
  return str.indexOf('@') >= 1 && str.length >= 3
}

const pattern = /^[a-f0-9]{40}$/i

const isValidAddress = (hex) => {
  if (typeof hex !== 'string') return false
  if (hex.slice(0, 2).toLowerCase() === '0x') hex = hex.slice(2)
  return pattern.test(hex)
}

const etherscanLink = (address, testnet) =>
  `https://${testnet ? 'testnet.' : ''}etherscan.io/address/${address}`

module.exports = {
  sha3,
  isValidEmail,
  isValidAddress,
  etherscanLink
}
