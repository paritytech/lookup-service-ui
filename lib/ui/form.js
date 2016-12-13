'use strict'

const yo = require('yo-yo')

const styles = require('./form.csjs.js')

const render = (state, actions) => {
  const chainOnChange = (e) => {
    const chain = e.target.value
    actions.setTestnet(chain === 'testnet')
  }
  const inputOnChange = (e) => {
    const input = e.target.value
    actions.setInput(input.trim())
  }

  return yo `
    <div>
      <input
        type="text" value="${state.input}"
        placeholder="email or address"
        onchange=${inputOnChange}
        onkeypress=${inputOnChange}
        onblur=${inputOnChange}
      />
      <div class="${styles.columns}">
        <select
          aria-label="chain"
          onchange=${chainOnChange}
        >
          <option
            value="mainnet" selected="${!state.testnet}"
          >Mainnet</option>
          <option
            value="testnet" selected="${state.testnet}"
          >Testnet</option>
        </select>
        <button
          className="lookup" onclick=${actions.lookup}
        >Lookup</button>
      </div>
    </div>
  `
}

module.exports = render
