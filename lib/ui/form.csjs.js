'use strict'
const css = require('csjs')
module.exports = css `

.columns {
  display: flex;
}

.columns > * {
	margin-left: .5rem;
}
.columns > :first-child {
	margin-left: 0;
}

`
