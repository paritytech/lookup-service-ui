'use strict'

const isValidEmail = (str) => {
  if (typeof str !== 'string') return false
  return str.indexOf('@') >= 1 && str.length >= 3
}

const pattern = /^[a-f0-9]{20}$/

const isValidAddress = (hex) => {
  if (typeof hex !== 'string') return false
  if (hex.slice(0, 2).toLowerCase() === '0x') hex = hex.slice(2)
  return pattern.test(hex)
}

module.exports = {
  isValidEmail: isValidEmail,
  isValidAddress: isValidAddress
}
