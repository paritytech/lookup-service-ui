'use strict'
const css = require('csjs')
module.exports = css `

.spinner {
	margin-top: 1rem;
	display: inline-block;
	width: 2em;
	height: 2em;
}

.spinner > div {
	width: 100%;
	height: 100%;
	background-color: #3498db;
	border-radius: 100%;
	-webkit-animation: spinning .6s infinite ease-out;
	animation: spinning .6s infinite ease-out;
}

@keyframes spinning {
	0% {
		-webkit-transform: scale(0);
		transform: scale(0);
	}
	30% {
		opacity: 1;
	}
	100% {
		-webkit-transform: scale(1);
		transform: scale(1);
		opacity: 0;
	}
}

`
