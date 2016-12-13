'use strict'

const yo = require('yo-yo')

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
			<select onchange=${chainOnChange}>
				<option
					value="mainnet" selected="${!state.testnet}"
				>Mainnet</option>
				<option
					value="testnet" selected="${state.testnet}"
				>Testnet</option>
			</select>
			<input
				type="email" value="${state.input}"
				onchange=${inputOnChange} onkeypress=${inputOnChange}
			/>
			<button onclick=${actions.lookup}>Lookup</button>
		</div>
	`
}

module.exports = render
