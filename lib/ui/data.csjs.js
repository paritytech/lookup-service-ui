'use strict'
const css = require('csjs')
module.exports = css `

.container {
	margin-top: 2rem;
}

.address {
	display: inline-block;
	padding: .3em .4em;
	line-height: 1;
	color: #333;
	text-decoration: none;
	background-color: #ddd;
	border-radius: .3em;
}

.address:hover {
	background-color: #eee;
}

.heading {
	font-size: 120%;
	font-weight: inherit;
}

.tokens {
	margin: .5rem 0 0 0;
}

.tokens .chip {
	font-size: 110%;
	color: white;
	background-color: #3498db;
}

.badges {
	margin: .5rem 0 0 0;
}

.badges .chip {
	color: white;
	background-color: #27ae60;
}
.badges .chip:hover {
	background-color: #37be70;
}

.badges a {
	color: white;
	text-decoration: none;
}

.chip {
	display: inline-block;
	margin-left: .5rem;
	padding: .2em .4em;
	border-radius: .3em;
}
.chip:first-child {
	margin-left: 0;
}

`
