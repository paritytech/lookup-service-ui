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
  background-color: #3498db;
}
.tokens .chip img {
  border-color: #3498db;
}
.tokens code {
  font-size: 110%;
}

.badges {
  margin: .5rem 0 0 0;
}

.badges a {
  color: white;
  text-decoration: none;
}

.chip {
  position: relative;
  display: inline-block;
  margin-left: 1rem;
  padding: .1em .4em .1em 2.2em;
  color: #fff;
  border-radius: .3em;
  background-color: #27ae60;
}
.chip:first-child {
  margin-left: 0;
}

.chip img {
  position: absolute;
  top: 50%; left: 0;
  margin-top: -1.1em;
  margin-left: -.2em;
  padding: .2em;
  width: 1.7em;
  height: 1.7em;
  border: .1em solid #27ae60;
  border-radius: 100%;
  background-color: white;
}

`
